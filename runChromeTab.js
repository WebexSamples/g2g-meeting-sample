const http = require('http');
const { exec } = require('child_process');

http
  .createServer((req, res) => {
    // Give the path of your bat or exe file
    // let myPage = (querystring.parse(req.url)["/myConf?conf"])
    console.log(req.url);

    if (req.url.endsWith('favicon.ico')) {
      console.log('did not find favicon');
      return res
        .writeHead(404, { 'Content-Type': 'text/plain' })
        .end('no favicon here');
    }

    var myPage = req.url.split('/myConf?conf=')[1];
    // console.log(myPage)

    exec(
      `open -a "Google Chrome" "${myPage}"`,
      { maxBuffer: Infinity },
      (err, stdout, stderr) => {
        console.log({ err, stdout, stderr });
        if (err) {
          return res.writeHead(500).end(JSON.stringify(err));
        }
        // Output of the script in stdout
        return res.writeHead(200).end(stdout);
      },
    );
  })
  .listen(3000);

console.log('STARTED');
