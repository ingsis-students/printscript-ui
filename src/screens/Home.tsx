import {withNavbar} from "../components/navbar/withNavbar.tsx";
import {SnippetTable} from "../components/snippet-table/SnippetTable.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SnippetDetail} from "./SnippetDetail.tsx";
import {Drawer} from "@mui/material";
import {useGetSnippets} from "../utils/queries.tsx";
import {usePaginationContext} from "../contexts/paginationContext.tsx";
import useDebounce from "../hooks/useDebounce.ts";

const HomeScreen = () => {
  const {id: paramsId} = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [snippetName, setSnippetName] = useState('');
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<number[]>([]);
  const [snippetId, setSnippetId] = useState<string | null>(null)
  const {page, page_size, count, handleChangeCount} = usePaginationContext()
  const {data, isLoading} = useGetSnippets(page, page_size, snippetName)

  useEffect(() => {
    if (data?.count && data.count != count) {
      handleChangeCount(data.count)
    }
  }, [count, data?.count, handleChangeCount]);


  useEffect(() => {
    if (paramsId) {
      setSnippetId(paramsId);
    }
  }, [paramsId]);

  const handleCloseModal = () => setSnippetId(null)

  // DeBounce Function
  useDebounce(() => {
        setSnippetName(
            searchTerm
        );
      }, [searchTerm, roleFilter, languageFilter], 800
  );

  const handleSearchSnippet = (snippetName: string) => {
    setSearchTerm(snippetName);
  };

  const handleRoleFilter = (role: string) => {
      if (roleFilter.includes(role)) {
          setRoleFilter(roleFilter.filter((r) => r !== role));
      } else {
          setRoleFilter([...roleFilter, role]);
      }
  }

  const handleLanguageFilter = (languageId: number) => {
      if (languageFilter.includes(languageId)) {
          setLanguageFilter(languageFilter.filter((r) => r !== languageId));
      } else {
          setLanguageFilter([...languageFilter, languageId]);
      }
  }

  return (
      <>
        <SnippetTable
            loading={isLoading}
            handleClickSnippet={setSnippetId}
            snippets={data?.snippets}
            handleSearchSnippet={handleSearchSnippet}
            handleRoleFilter={handleRoleFilter}
            handleLanguageFilter={handleLanguageFilter}
        />
        <Drawer open={!!snippetId} anchor={"right"} onClose={handleCloseModal}>
          {snippetId && <SnippetDetail handleCloseModal={handleCloseModal} id={snippetId}/>}
        </Drawer>
      </>
  )
}

export default withNavbar(HomeScreen);