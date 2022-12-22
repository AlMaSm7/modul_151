import {useState, useEffect} from "react";
import axios from "axios";
import { Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const LikedPokemons = () => {

    const [likedPokemons, setLikedPokemons] = useState([])

    const fetchData = () => {
        axios.get("http://localhost:8080/pokemon")
            .then((res) => {
                setLikedPokemons(res.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <Card sx={{ maxWidth: 900}}>
            <CardContent>
                <Typography variant='h3'>Here's a list of the top 10 liked Pokemons today!</Typography>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Grid container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.3rem'}}>
                    <Grid item>
                        <List>
                            {likedPokemons.map((e: any, index: any) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <CatchingPokemonIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {e.name + 'was liked: '+ e.count + " times today!"}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default LikedPokemons