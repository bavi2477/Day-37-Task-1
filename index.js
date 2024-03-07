import express from 'express';
import fs from 'fs';
import {format} from 'date-fns';

const app = express();

const PORT = 4000;

app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to view the current timestamp./n Add /write to view the success message. /n Add /read to read the current time "})
})


app.get('/write', (req,res) => {
    let today = format(new Date(), 'dd-mm-yyyy-HH-mm-ss')
    console.log("today",today);
    const filePath = `TimeStamp/${today}.txt`;
    fs.writeFileSync(filePath, `${today}` , 'utf8');
    res.status(200).json({message: "File created successfully"})
})

app.get('/read', (req, res) => {
    let files = fs.readdirSync('TimeStamp');

    const latestFile = files[files.length - 1];
    const filePath = `TimeStamp/${latestFile}`;

    let data = fs.readFileSync(filePath, 'utf8');
    res.status(200).send(data);
})

//running 
app.listen(PORT, () => {
    console.log(`App is running in the port = ${PORT}`);
}) 