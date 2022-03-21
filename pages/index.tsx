import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';
import { useRouter } from 'next/router';
import LoaderIcon from "./loader.svg"

function Home(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    router.push("http://localhost:3000/courses/financial-analytics")
    setIsLoading(false)
    // eslint-disable-next-line
  }, [])
  
  return (
    <>
      {!isLoading && <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}><LoaderIcon /></div>}
    </> 
  );
}

export default withLayout(Home)

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