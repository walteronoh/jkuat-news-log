import { Masonry } from "@mui/lab";
import { Box, Grid, Card, CardContent, CardMedia, CardActions, Button, Typography, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNews, fetchNewsFromLocalStorage, saveNewsToLocalStorage } from "../api/api";

function ReadNews() {
    const navigate = useNavigate();
    const params = useParams();
    const [savedNews, setSavedNews] = useState([]);
    const [news, setNews] = useState({});

    useEffect(() => {
        // Get news
        handleFetchPageNews();
        // Save to local storage
        saveNewsToLocalStorage(params.id);
        // Get saved news
        handleFetchSavedNews();
    }, []);

    const handleFetchPageNews = () => {
        fetchNews().then((resp) => {
            setNews(resp.find((v) => v.id === params.id));
        });
    }

    const handleFetchSavedNews = () => {
        let sNews = fetchNewsFromLocalStorage();
        if (sNews) {
            console.log(sNews);
            fetchNews().then((resp) => {
                setSavedNews(resp.filter((value) => sNews.map((v) => v.id).includes(value.id)));
            });
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
                <Box sx={{ width: "100%" }}>
                    <Chip label={news.posting_date} />
                    <Card>
                        {/* <CardMedia
                            sx={{ height: 500 }}
                            image="/images/cougars.jpg"
                            title="Cougars"
                        /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {news.news_header}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {
                                    news.news_content ? news.news_content.split('\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    )) : ''
                                }
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
                            savedNews.map((v, i) =>
                                <Card key={i}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {v.news_header}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {v.news_cut}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => {
                                            navigate(`/read-news/${v.id}`);
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