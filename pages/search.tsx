import axios from 'axios'
import { GetStaticProps } from 'next'
import React from 'react'
import { API } from '../helpers/api'
import { MenuItem } from '../interfaces/menu.interface'
import { withLayout } from '../layout/Layout'

const Search = () => {
  return (
    <div>Search</div>
  )
}

export default withLayout(Search)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {firstCategory})

  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}