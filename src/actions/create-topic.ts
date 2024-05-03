'use server';

import type { Topic } from '@prisma/client';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { auth } from '@/auth';
import paths from '@/paths';
import { db } from '@/db';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, { 
      message: 'Must be lowercase letters or dasher without spaces'
    }),
  description: z.string().min(10)
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[] // generic form errors (at the form level, not field level)
  }
}

export async function createTopic(
  formState: CreateTopicFormState, 
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description')
  });

  if (!result.success) return {
    errors: result.error.flatten().fieldErrors
  };

  const session = await auth();
  if (!session || !session.user) return {
    errors: {
      _form: ['You must be signed in to do this.']
    }
  };

  let topic: Topic; // we need to extract the id of the topic to add as slug to the redirect
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description
      }
    });

  } catch (err: unknown) {
    return {
      errors: {
        _form: [err instanceof Error ? err.message : 'Something went wrong']
      }
    };
  }

  revalidatePath('/'); // redirect() exists the function and throws error, so you have to revalidate before it
  redirect(paths.topicShow(topic.slug));
}