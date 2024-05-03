'use client';

import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export default function SearchInput() {
  const searchParams = useSearchParams(); // need to wrap this component in a <Suspense /> to allow rendering parent component on the server

  return (
    <form action={actions.search}>
      <Input 
        name='term'
        defaultValue={searchParams.get('term') || ''}
      />
    </form>  
  );
}