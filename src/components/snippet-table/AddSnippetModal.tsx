import {
    Box,
    Button,
    capitalize,
    CircularProgress,
    Input,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {highlight, languages} from "prismjs";
import {useEffect, useState} from "react";
import Editor from "react-simple-code-editor";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css";
import {Save} from "@mui/icons-material";
import {CreateSnippet, CreateSnippetWithLang} from "../../utils/snippet.ts";
import {ModalWrapper} from "../common/ModalWrapper.tsx";
import {useCreateSnippet, useGetFileTypes} from "../../utils/queries.tsx";
import {queryClient} from "../../App.tsx";

export const AddSnippetModal = ({open, onClose, defaultSnippet}: {
    open: boolean,
    onClose: () => void,
    defaultSnippet?: CreateSnippetWithLang
}) => {
    const [languageId, setLanguageId] = useState(defaultSnippet?.language ?? "1");
    const [code, setCode] = useState(defaultSnippet?.content ?? "");
    const [snippetName, setSnippetName] = useState(defaultSnippet?.name ?? "")
    const [errors, setErrors] = useState<string[]>([]);
    const {mutateAsync: createSnippet, isLoading: loadingSnippet} = useCreateSnippet({
        onSuccess: () => queryClient.invalidateQueries('listSnippets')
    })
    const {data: fileTypes} = useGetFileTypes();

    const handleCreateSnippet = async () => {
        setErrors([]);

        const selectedFileType = fileTypes?.find((f) => f.id === languageId);

        const newSnippet: CreateSnippet = {
            name: snippetName,
            content: code,
            language: selectedFileType?.id ?? "1", //TODO RARI ESTA VARIABLE
            extension: selectedFileType?.extension ?? "ps",
            version: selectedFileType?.version ?? "1.1"
        };

        try {
            const response = await createSnippet(newSnippet);

            if (response.errors && response.errors.length > 0) {
                setErrors(response.errors);
            } else {
                onClose();
            }
        } catch (err) {
            setErrors(["An error occurred while creating the snippet."]);
        }
    };

    const handleClose = () => {
        setErrors([]);
        onClose();
    };

    useEffect(() => {
        if (defaultSnippet) {
            setCode(defaultSnippet?.content)
            setLanguageId(defaultSnippet?.language);
            setSnippetName(defaultSnippet?.name)
        }
    }, [defaultSnippet]);

    return (
        <ModalWrapper open={open} onClose={handleClose}>
            <Box sx={{ maxHeight: '100vh', p: 2 }}>
                {
                    <Box sx={{display: 'flex', flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography id="modal-modal-title" variant="h5" component="h2"
                                    sx={{display: 'flex', alignItems: 'center', pb: '16px'}}>
                            Add Snippet
                        </Typography>
                        <Button disabled={!snippetName || !code || !languageId || loadingSnippet} variant="contained"
                                disableRipple
                                sx={{boxShadow: 0}} onClick={handleCreateSnippet}>
                            <Box pr={1} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                {loadingSnippet ? <CircularProgress size={24}/> : <Save/>}
                            </Box>
                            Save Snippet
                        </Button>
                    </Box>
                }
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    pb: '16px'
                }}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Input onChange={e => setSnippetName(e.target.value)} value={snippetName} id="name"
                           sx={{width: '50%'}}/>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    pb: '16px'
                }}>
                    <InputLabel htmlFor="name">Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={languageId}
                        label="Age"
                        onChange={(e: SelectChangeEvent<string>) => setLanguageId(e.target.value)}
                        sx={{width: '50%'}}
                    >
                        {(Array.isArray(fileTypes) && fileTypes.length > 0) ? (
                            fileTypes.map((x) => (
                                x && x.language ? (
                                    <MenuItem data-testid={`menu-option-${x.language}`} key={x.id} value={x.id}>
                                        {capitalize(x.language)} {x.version}
                                    </MenuItem>
                                ) : null
                            ))
                        ) : (
                            <MenuItem>No file types accepted</MenuItem>
                        )}
                    </Select>
                </Box>
                <InputLabel>Code Snippet</InputLabel>
                <Box width={"100%"} sx={{
                    backgroundColor: 'black', color: 'white', borderRadius: "8px",
                }}>
                    <Editor
                        value={code}
                        padding={10}
                        data-testid={"add-snippet-code-editor"}
                        onValueChange={(code) => setCode(code)}
                        highlight={(code) => highlight(code, languages.js, 'javascript')}
                        style={{
                            borderRadius: "8px",
                            overflow: "auto",
                            minHeight: "300px",
                            maxHeight: "600px",
                            width: "100%",
                            fontFamily: "monospace",
                            fontSize: 17,
                        }}
                    />
                </Box>
                {errors.length > 0 && (
                    <Box sx={{color: 'red', p: 1}}>
                        {errors.map((error, idx) => (
                            <Typography key={idx}>{error}</Typography>
                        ))}
                    </Box>
                )}
            </Box>
        </ModalWrapper>
    )
}

