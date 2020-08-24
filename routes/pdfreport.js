const express = require('express');
const router = express.Router();
let ejs = require("ejs");
let pdf = require("html-pdf");
var path = require("path");
router.post('/GeneratePDF', (req, res, next) => {
   
    ejs.renderFile(path.join(__dirname, '../views/', req.body.ViewName), {
        Data: req.body.PDFData
    }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let options =req.body.PDFOption;
            pdf.create(data, options).toFile("../PDF DOWNLOADS/"+req.body.FileName, function (err, data) {
                if (err) {
                    res.status(200).json({error_status:true,message:'THERE IS SOME ERROR'})
                } else {
                    res.status(200).json({error_status:false,message:'PDF CREATED SUCCESSFULLY'})
                }
            });
        }
    });
});

router.get('/pdfDownload/', (req, res, next) => {

    var thePage = req.query.page;
   var filePath="../PDF DOWNLOADS/"+ thePage + "";
   // var filePath = "../../../../../mnt/oracle/mis/" + thePage + "";

    res.download(filePath);

});

module.exports = router;