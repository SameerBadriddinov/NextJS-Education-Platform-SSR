import React, { useState } from 'react'
import { SearchProps } from './Search.props'
import cn from "classnames"
import styles from "./Search.module.css"
import Input from '../Input/Input'
import Button from '../Button/Button'
import SearchIcon from "./search.svg"
import { useRouter } from 'next/router'

const Search = ({className, ...props}: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("")
  const router = useRouter()

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search
      }
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key == "Enter") {
      goToSearch()
    }
  }

  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input  
        placeholder='Поиск...'
        value={search}
        className={styles.input}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button 
        appearance='primary'
        className={styles.button}
        onClick={goToSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  )
}

export default Search