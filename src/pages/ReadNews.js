import { Masonry } from "@mui/lab";
import { Box, Grid, Card, CardContent, CardMedia, CardActions, Button, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNewsFromLocalStorage, saveNewsToLocalStorage } from "../api/api";

function ReadNews() {
    const navigate = useNavigate();
    const params = useParams();
    const [previousNews, setPreviousNews] = useState([]);

    useEffect(() => {
        console.log(params.id);
        // Save to local storage
        saveNewsToLocalStorage(params.id);
        // Get saved news
        setPreviousNews(fetchNewsFromLocalStorage());
    }, []);
    

    const handleFetchSavedNews = () => {
        let prevNews = fetchNewsFromLocalStorage();
        
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
                <Box sx={{ width: "100%" }}>
                    <Chip label="Monday 12, June, 2024" />
                    <Card>
                        <CardMedia
                            sx={{ height: 500 }}
                            image="/images/cougars.jpg"
                            title="Cougars"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                The News Header
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={12} md={3}>
                <Box sx={{ width: "100%" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        Recent Readings
                    </Typography>
                    <Masonry columns={1}>
                        {
                            [1, 2, 3, 4, 5].map((v, i) =>
                                <Card key={i}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            The News header ....
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            The News content ....
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => {
                                            navigate("/read-news");
                                        }}>Read More</Button>
                                    </CardActions>
                                </Card>
                            )
                        }
                    </Masonry>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ReadNews;