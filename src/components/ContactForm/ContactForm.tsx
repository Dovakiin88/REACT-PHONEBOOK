import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { choosePhone, chooseAddress, chooseEmail, choosename } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents';
import { Button } from '@material-ui/core';
import { server_calls } from '../../api';

interface ContactFormProps{
  id?:string;
  data?:{}
}

interface ContactState{
  name: string;
  email: string;
  address: string;
  Phone_number: string;
};

export const ContactForm = (props:ContactFormProps) => {

  const dispatch = useDispatch();
  const store = useStore();
  const name = useSelector<ContactState>(state => state.name)
  const { register, handleSubmit} = useForm({})

  const onSubmit = (data:any, event:any) => {
    console.log(props.id)
    if(props.id!){
      server_calls.update(props.id!, data);
      console.log(`Updated:${data} ${props.id}`);
      console.log(data);
      setTimeout( () => {window.location.reload()}, 1000);
      event.target.reset();
    }else{
      dispatch(choosename(data.name));
      dispatch(chooseEmail(data.email));
      dispatch(chooseAddress(data.address));
      dispatch(choosePhone(data.phone_number));
      server_calls.create(store.getState());
      setTimeout( () => {window.location.reload()}, 1000);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Contact Name</label>
          <Input {...register('name')} name='name' placeholder='Name'/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input {...register('email')} name='email' placeholder='Email'/>
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number</label>
          <Input {...register('phone_number')} name='phone_number' placeholder='Phone Number'/>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <Input {...register('address')} name='address' placeholder='Address'/>
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}
