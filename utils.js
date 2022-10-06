const fs = require('fs')

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}
function valid_credit_card(value) {
    if (/[^0-9-\s]+/.test(value)) return false;
    if (value.length < 13 || value.length > 16) return false;
    
        var d = 0, e = false; 
        return ( value.split("").reverse().reduce(
                     function(s,dstr){ d = parseInt(dstr); 
                         return (s + ((e = !e) ? d : [0,2,4,6,8,1,3,5,7,9][d]));
                       } 
                    ,0
                    ) % 10 == 0
               );
    }

    function valid_credit_card_cvv(value) {
            if (value.length >=3 && value.length <=4) {
                return true;
            }
            return false;
    }

    function valid_month(value) {
        if (parseInt(value) <= 12 &&
            value.length >=1 && value.length <=2) {
            return true;
        }

     
        return false;
    }

    function valid_year(value) {
        var currentTime = new Date();
        var year = currentTime.getFullYear()
        console.log(year);
        if (value.length == 4 && value >= year && (parseInt(value)-year) <= 5) {
            return true;
        }
       
        return false;
    }

    function valid_email(value) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (regex.test(value) &&
           (value.toLowerCase().includes("gmail.com")
            || value.toLowerCase().includes("hotmail.com")
            || value.toLowerCase().includes("“yahoo.es"))) {
            return true;
        }

        return false;
    }

module.exports = {
    writeDataToFile,
    getPostData,
    valid_credit_card,
    valid_credit_card_cvv,
    valid_month,
    valid_year,
    valid_email
}
