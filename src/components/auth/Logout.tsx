import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@mui/material";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button sx={{
            my: 2,
            color: 'white',
            display: 'flex',
            justifyContent: "center",
            gap: "4px",
            backgroundColor: 'primary.light',
            "&:hover": {
                backgroundColor: 'primary.dark'
            }
        }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
        </Button>
    );
};

export default LogoutButton;