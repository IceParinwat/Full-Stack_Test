const express = require('express');
const app = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const exceljs = require('exceljs');

dotenv.config();

const { checkSignIn } = require('../middleware/auth')

app.use(fileUpload());

app.post('/create', async (req, res) => {
  try {
    await prisma.product.create({
      data: req.body,
    });

    res.send({ message: 'success' });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.get('/list',async (req, res) => {
  try {
    const data = await prisma.product.findMany({
      orderBy: {
        id: 'desc',
      },
      where: {
        status: 'use'
      }
    });

    res.send({ results: data });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.delete('/remove/:id',checkSignIn, async (req, res) => {
  try {
    await prisma.product.update({
      data: {
        status: 'delete'
      },
      where: {
        id: parseInt(req.params.id)
      }
    })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

app.put('/update', async (req, res) => {
  try {
    const fs = require('fs')
    const oltData = await prisma.product.findFirst({
      where: {
        id: parseInt(req.body.id)
      }
    });

    //Remove Old Image
    const imagePath = '/uploads/' + oltData.img;
    if (oltData.img != '') {
      if (fs.existsSync(imagePath)) {
        await fs.unlinkSync(imagePath);
      };
    };

    await prisma.product.update({
      data: req.body,
      where: {
        id: parseInt(req.body.id)
      }
    });
    res.send({ message: 'success' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

app.post('/upload', async (req, res) => {
  try {
    if (req.files != undefined) {
      if (req.files.img != undefined) {
        const img = req.files.img;

        const myDate = new Date();
        const y = myDate.getFullYear();
        const m = myDate.getMonth() + 1;
        const d = myDate.getDate();
        const h = myDate.getHours();
        const mi = myDate.getMinutes();
        const s = myDate.getSeconds();
        const ms = myDate.getMilliseconds();

        const arrFileName = img.name.split('.');
        const ext = arrFileName[arrFileName.length - 1];

        const newName = `${y}${m}${d}${h}${mi}${s}${ms}.${ext}`;

        img.mv('./uploads/' + newName, (err) => {
          if (err) throw err;

          res.send({ newName: newName });
        })
      }
    } else {
      res.status(501).send('notimplemented');
    }
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

app.post('/uploadFromExcel', (req, res) => {
  try {
    const fileExcel = req.files.fileExcel;

    if (fileExcel != undefined) {
      if (fileExcel != null) {


        const uploadPath = './uploads/' + fileExcel.name;
        fileExcel.mv(uploadPath, async (err) => {
          if (err) throw err;

          const workbook = new exceljs.Workbook();
          await workbook.xlsx.readFile(uploadPath);

          const ws = workbook.getWorksheet(1);

          for (let i = 2; i <= ws.rowCount; i++) {
            const name = ws.getRow(i).getCell(1).value ?? "";
            const cost = ws.getRow(i).getCell(2).value ?? 0;
            const price = ws.getRow(i).getCell(3).value ?? 0;
            if (name != "" && cost >= 0 && price >= 0) {

              await prisma.product.create({
                data: {
                  name: name,
                  cost: cost,
                  price: price,
                  img: '',
                }
              })
            }
          }

          //Remove File From Server
          const fs = require('fs');
          await fs.unlinkSync('./uploads/' + fileExcel.name);

          res.send({ message: 'Success' });
        });
      } else {
        res.status(500).send({ message: 'fileExcel is null' });
      }
    } else {
      res.status(500).send({ message: 'fileExcel is undefined' });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

module.exports = app;