import {useEffect, useState} from 'react'
import axios from 'axios'
import { Card, CardActionArea, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import LocalPoliceIcon from '@mui/icons-material/LocalPolice'
import ShieldIcon from '@mui/icons-material/Shield'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import GradeIcon from '@mui/icons-material/Grade'
import Grid from '@mui/material/Grid'
import SuccessAlert from './SuccessAlert'


const Pokemon = () => {

    const [pokeData, setPokeData] = useState<any>({})
    const [wasPressed, setWasPressed] = useState<string>('false')
    const [success, setSuccess] = useState<boolean>(false)

    const fetchData = (newPokemon: boolean) => {
        let id = 0

        if(newPokemon){
            id = Math.floor(Math.random() * 904 + 1)
            localStorage.setItem("wasPressed", "false")
            setWasPressed('false')
        }else{
            // @ts-ignore
            id = +localStorage?.getItem("pokeId")
        }
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((res) => {
                setPokeData(res.data)
                let date = Date.now()
                let tmr = new Date(date)
                tmr.setDate(tmr.getDate() + 1)
                localStorage.setItem("pokeId", res.data.id)
                localStorage.setItem("time", tmr.toISOString())
            }).catch((err) => {
            console.log(err)
        })
    }

    const getTimeNow = () => {
        let time = Date.now()
        let toDate = new Date(time)
        return toDate
    }

    const getTimeLocalstorage = () => {
        let localStorageValue = '2023-01-29T21:35:46.701Z'
        let time: Date | null  = null
        if(localStorageValue !== null){
            time = new Date(localStorageValue)
            console.log(time.getDate())
        }
        return time
    }

    const likePokemon = () => {
        axios.post('https://mashup-pokeapi.azurewebsites.net/pokemon', {
            name: pokeData.name
        })
            .then(response => {
                setWasPressed('true')
                setSuccess(true)
                localStorage.setItem("wasPressed", "true")
            })
            .catch(error => {
                setSuccess(false)
                console.error(error)
            })
    }

    useEffect(() => {

        if(localStorage?.getItem("wasPressed") !== null){
            // @ts-ignore
            setWasPressed(localStorage?.getItem("wasPressed"))
        }else{
            localStorage.setItem("wasPressed", "false")
        }
        let timeLocal = getTimeLocalstorage()
        if (timeLocal !== null){
            // @ts-ignore
            if(getTimeNow().getFullYear() >= timeLocal?.getFullYear()){
                if(getTimeNow().getMonth() >= timeLocal?.getMonth()){
                    if(getTimeNow().getDate() > timeLocal?.getDate()){
                        console.log(timeLocal?.getDate())
                        fetchData(true)
                    }else{
                        fetchData(false)
                    }
                }else{
                    fetchData(false)
                }
            }else{
                fetchData(false)
                console.log("here")
            }
        }else{
            fetchData(true)
            console.log("here")
        }
    }, [])

    return (
        <>
            { success &&
                <SuccessAlert />
            }
            <Card sx={{ minWidth: '100%'}}>
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
                                            { e.stat.name === 'hp' &&
                                                <HealthAndSafetyIcon/>
                                            }
                                            { e.stat.name === 'defense' &&
                                                <ShieldIcon/>
                                            }
                                            {e.stat.name === 'speed' &&
                                                <DirectionsRunIcon/>
                                            }
                                            {e.stat.name === 'attack' &&
                                                <PriorityHighIcon/>
                                            }
                                            {e.stat.name === 'special-attack' &&
                                                <GradeIcon/>
                                            }
                                            {e.stat.name === 'special-defense' &&
                                                <LocalPoliceIcon/>
                                            }
                                        </ListItemIcon>
                                        <ListItemText>
                                            {e.stat.name + ': '+ e.base_stat}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                    { wasPressed === 'false' &&
                        <CardActionArea>
                            <Button variant='contained' onClick={likePokemon}>Like</Button>
                        </CardActionArea>
                    }
                </CardContent>
            </Card>
        </>
    )
}

export default Pokemon