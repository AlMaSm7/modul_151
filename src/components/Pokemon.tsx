import {useEffect, useState} from 'react'
import axios from 'axios'
import { Card, CardActionArea, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import Grid from '@mui/material/Grid'


const Pokemon = () => {
    
    const [pokeData, setPokeData] = useState<any>({})

    const fetchData = (newPokemon: boolean) => {
        let id = 0
        
        if(newPokemon){
            id = Math.floor(Math.random() * 905)
        }else{
            // @ts-ignore
            id = +localStorage?.getItem("pokeId")
        }
        console.log(id)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => {
                setPokeData(res.data)
                let date = Date.now()
                let tmr = new Date(date)
                localStorage.setItem("pokeId", res.data.id)
                localStorage.setItem("time", (tmr.getDate() + 1).toString())
            }).catch((err) => {
                console.log(err)
            })
    
    }

    const getTimeNow = () => {
        let time = Date.now()
        let toDate = new Date(time)
        return +toDate.getDate()
    }

    const getTimeLocalstorage = () => {
        let localStorageValue = localStorage?.getItem("time")
        let time = 0
        if(localStorageValue !== null){
            time = +localStorageValue
        }
        return time
    }

    useEffect(() => { 
        let temp = getTimeLocalstorage()
        if(getTimeNow() >= temp){
            fetchData(true)
        }else{
            fetchData(false)
        }
        console.log(pokeData.stats)
    }, [])
    
    return (
        <Card sx={{ maxWidth: 900}}>
            <CardContent>
                <Typography variant='h3'>Pokemon: {pokeData?.name}!</Typography>
                <CardMedia
                    sx={{objectFit: "contain"}}
                    component="img"
                    src={pokeData.sprites?.front_default}
                    height='400'
                />
                <Grid container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.3rem'}}>
                    <Grid item>
                        <List>
                        {pokeData.stats?.map((e: any, index: any) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <CatchingPokemonIcon/>
                                </ListItemIcon>
                                <ListItemText>
                                    {e.stat.name + ': '+ e.base_stat}
                                </ListItemText>
                            </ListItem>
                        ))}                    
                        </List>
                    </Grid>
                </Grid>
                <CardActionArea>
                    <Button variant='contained'>Like</Button>
                </CardActionArea>
            </CardContent>
        </Card>
    )
}

export default Pokemon