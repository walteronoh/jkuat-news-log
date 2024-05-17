import Masonry from '@mui/lab/Masonry';
import { Avatar, Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNews } from "../api/api";

function Home() {
    const navigate = useNavigate(); c
    const [news, setNews] = useState([]);
    const [randomNews, setRandomNews] = useState({ news_header: "", news_cut: "", news_id: "" });
    const [dateTime, setDateTime] = useState("");

    useEffect(() => {
        handleFetchNews();
        handleGetDateTime();
    }, []);

    const handleFetchNews = () => {
        fetchNews().then((resp) => {
            setNews(resp);
            // Set Random Newsp0
            setRandomNews(resp[Math.floor(Math.random() * resp.length)]);
        })
    };

    const handleGetDateTime = () => {
        setDateTime(moment().format("DD, MMM, yyyy"));
    }

    return (<>
    <div className="page">
        <div className="aside-box"></div>
        <div className="content">

        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: "30px" }}>
            <Avatar
                alt="JKUAT Logo"
                src="/jkuat-logo.png"
                sx={{ width: 35, height: 35 }}
            />
            <Typography variant="body2" color="text.secondary">
                {dateTime}
            </Typography>
        </Box>
        <Box sx={{ height: '80vh', display: 'flex', padding: "20px" }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                    <Typography gutterBottom variant="h5" component="div">
                        {randomNews.news_header}
                    </Typography>
                    <Typography sx={{ width: '50%' }} variant="body2" color="text.secondary">
                        {randomNews.news_cut}
                    </Typography>
                    <Button size="small" onClick={() => {
                        navigate(`/read-news/${randomNews.id}`);
                    }}>Read More</Button>
                </Box>
            </Box>
        </Box>
        <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
            {news.map((v, i) => <Card key={i}>
                {/* <CardMedia
                    sx={{ height: 200 }}
                    image="/images/cougars.jpg"
                    title="Cougars"
                /> */}
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
        </div>
        </div>
    </>);
}

export default Home;