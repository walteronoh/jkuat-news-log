import { Card, CardContent, Typography, CardActions, Button, CardMedia, Box } from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import { useNavigate } from "react-router-dom";
import { fetchNews } from "../api/api";
import { useEffect, useState } from "react";

function Home() {
    const navigate = useNavigate();
    const [news, setNews] = useState([]);

    useEffect(() => {
        handleFetchNews();
    }, []);

    const handleFetchNews = () => {
        fetchNews().then((resp) => {
            setNews(resp);
        })
    };

    return (<>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', width: '100%' }}>
            <Box>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
                <Button size="small" onClick={() => {
                    navigate("/read-news");
                }}>Read More</Button>
            </Box>
        </Box>
        <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
            {news.map((v, i) => <Card key={i}>
                <CardMedia
                    sx={{ height: 200 }}
                    image="/images/cougars.jpg"
                    title="Cougars"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {v.news_header}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {v.news_cut}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => {
                        navigate(`/read-news/${v.id}`);
                    }}>Read More</Button>
                </CardActions>
            </Card>)}
        </Masonry>
    </>);
}

export default Home;