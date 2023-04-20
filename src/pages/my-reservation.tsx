import UserService from '@/app/api/services/userService';
import Layout from '@/app/components/layout/layout';
import MyReservation from '@/app/components/reservation/myReservation';
import withAuth from '@/app/hoc/withAuth'
import Cookie from '@/app/utils/Cookie';
import React, { useEffect, useState } from 'react'

const Myreservation = () => {
  const [reserv, setReserv] = useState<any[]>([])
  useEffect(() => {
    const getUser = async (token:string) => {
      const user = await UserService.getUserByToken(token);
      const reserv = await UserService.myReservations(user.id);
      setReserv(reserv)
    }
    const token = Cookie.get('token');
    getUser(token?token:"");

  }, [])
  return (
    <Layout>
      <main style={{backgroundColor:"#f2f3f4",height:"100vh"}}>
        <h4 className='p-3 mx-5'><b>Rezervasiyalarım</b></h4>
        <MyReservation reserv={reserv} />
      </main>
    </Layout>
  )
}

export default withAuth(Myreservation,true);
