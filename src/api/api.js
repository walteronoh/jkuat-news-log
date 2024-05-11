import moment from "moment";

const fetchNews = async () => {
    return await fetch("/data/content.json").then((resp) => resp.json());
}

const saveNewsToLocalStorage = (id) => {
    let newsPayload = [];
    // fetch first form local storage
    let savedNews = window.localStorage.getItem("previous_news");
    if (savedNews) {
        let nws = JSON.parse(savedNews);
        // Check if the news already exists in local storage
        let index = nws.findIndex((v) => v.id === id);
        if (index >= 0) {
            nws[index].time = moment().format()
        } else {
            nws.push({ id: id, time: moment().format() });
        }
        newsPayload = nws;
    } else {
        // Save to local storage
        newsPayload.push({ id: id, time: moment().format() });
    }
    window.localStorage.setItem("previous_news", JSON.stringify(newsPayload));
}

const fetchNewsFromLocalStorage = () => {
    // Select top 5 from local storage, make them unique
    let savedNews = window.localStorage.getItem("previous_news");
    if (savedNews) {
        return JSON.parse(savedNews).sort((a, b) => moment(b.time).diff(moment(a.time))).splice(0, 5);
    }
    return [];
}

export { fetchNews, saveNewsToLocalStorage, fetchNewsFromLocalStorage };