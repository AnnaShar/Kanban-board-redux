import express from 'express'
import bodyParser from "body-parser";
import boardController from './server-board-controller.js';
import cors from 'cors';

const port = 8080;

const app = new express();
app.use(cors());
app.options('*', cors());
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(express.json({
    type: ['application/json', 'text/plain']
}));


const handleResponse = (req, res, handler) => {
    try {
        let data = handler();
        res.status(200).send(data);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
};

app.get('/api/board', (req, res)=>{
    handleResponse(req, res, ()=>{
        return boardController.getBoard();
    });
});

app.get('/api/board/tasks', (req, res)=>{
    handleResponse(req, res, ()=>{
        return boardController.getAllTasks();
    });
});


app.get('/api/board/columns', (req, res)=>{
    handleResponse(req, res, ()=>{
        return boardController.getColumns();
    });
});

app.get('/api/board/columns/:uid', (req, res)=>{
    let id = req.params.uid;
    handleResponse(req, res, ()=>{
        return boardController.getTasksByColumn(id);
    });
});

app.get('/api/board', (req, res)=>{
    handleResponse(req, res, ()=>{
        return boardController.getBoardInfo();
    });
});

app.patch('/api/board/edit', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    handleResponse(req, res, () => {
        return boardController.changeBoardName(req.body);
    });
});

app.patch('/api/board/tasks/move/:uid', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    handleResponse(req, res, () => {
        return boardController.moveTask(id, req.body);
    });
});

app.delete('/api/board/tasks/delete', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    handleResponse(req, res, () => {
        return boardController.deleteTask(req.body);
    });
});

app.post('/api/board/tasks/add/:uid', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    handleResponse(req, res, () => {
        return boardController.addTask(id, req.body);
    });
});

app.patch('/api/board/tasks/edit/:uid', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    handleResponse(req, res, () => {
        return boardController.changeTaskName(id, req.body);
    });
});

app.post('/api/board/columns/add', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    handleResponse(req, res, () => {
        return boardController.addColumn(req.body);
    });
});

app.patch('/api/board/columns/move/:uid', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    handleResponse(req, res, () => {
        return boardController.moveColumn(id, req.body);
    });
});

app.patch('/api/board/columns/edit/:uid', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    handleResponse(req, res, () => {
        return boardController.changeColumnName(id, req.body);
    });
});

app.delete('/api/board/columns/delete/:uid', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    handleResponse(req, res, () => {
        return boardController.deleteColumn(id);
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});