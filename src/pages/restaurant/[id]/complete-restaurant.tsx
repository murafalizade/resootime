import RestaurantService from '@/app/api/services/restaurantService'
import CompleteInfoForum from '@/app/components/forms/completeInfoForum'
import Layout from '@/app/components/layout/layout'
import withClient from '@/app/hoc/withClient'
import React from 'react'

const CompleteRestaurant = ({res}:any) => {
  return (
    <Layout>
      <CompleteInfoForum res={res}/>
    </Layout>
  )
}

export default withClient(CompleteRestaurant);

export async function getServerSideProps(context:any){
  const { id } = context.query
  const res = await RestaurantService.getRestaurant(id);
  return {
    props: {
      res
    },
  }
}
