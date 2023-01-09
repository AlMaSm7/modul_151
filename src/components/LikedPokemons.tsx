import {useState, useEffect} from "react";
import axios, {CancelToken} from "axios";
import {
    Card,
    CardContent,
    CircularProgress,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

const LikedPokemons = () => {

    const [likedPokemons, setLikedPokemons] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchData = () => {
        console.log("here")
        axios.get("https://mashup-pokeapi.azurewebsites.net/pokemon")
            .then((res) => {
                setLikedPokemons(res.data)
                setIsLoading(false)
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Card sx={{maxWidth: 900}}>
            <CardContent>
                <Typography variant='h3'>Here's a list of the top 10 liked Pokemons today!</Typography>
                <Grid container
                      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.3rem'}}>
                    <Grid item>
                        {isLoading ?
                            <CircularProgress/>
                            : likedPokemons.length != 0 ?
                                <List>
                                    {likedPokemons.map((e: any, index: any) => (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <CatchingPokemonIcon/>
                                            </ListItemIcon>
                                            <ListItemText>
                                                {e.name + ' was liked: ' + e.count + " times today!"}
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List> :
                                <Typography>No Pokemones liked today :(</Typography>
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default LikedPokemons