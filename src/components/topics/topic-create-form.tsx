'use client';

import { useFormState } from 'react-dom';
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react';
import * as actions from '@/actions';
import FormButton from '../common/form-button';

export default function TopCreateForm() {
  /* useFormState requires second param's type to be identical
  to the second param, and return value, specified inside the server action */ 
  const [formState, action] = useFormState(
    actions.createTopic, 
    { errors: {} }
  );

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">
          Create a Topic
        </Button>
      </PopoverTrigger> 
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">
              Create Topic
            </h3>
            <Input 
              name="name"
              label="Name" 
              labelPlacement="outside" 
              placeholder="Name" 
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.map(
                (e, i) => <div key={e + '_' + i}>{i + 1}. {e}</div>
              )}
            />
            <Textarea 
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.map(
                (e, i) => <div key={i}>{i + 1}. {e}</div>
              )}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(', ')}
              </div>
            ) : null}
            <FormButton>
              Save
            </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}