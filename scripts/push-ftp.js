const ftp = require("vinyl-ftp");
const fs = require("vinyl-fs");
const path = require("path");
const minimist = require("minimist");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "..", ".env.ftp") });

const argv = minimist(process.argv.slice(2));
const { src, dest } = argv;
if (!src) throw new Error("You must specify where the source files to upload are, using --src");
if (!dest)
  throw new Error(
    "You must specify where the destination directory on the ftp server is, using using --dest"
  );

const conn = ftp.create({
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  timeOffset: process.env.FTP_TIMEOFFSET ? parseFloat(process.env.FTP_TIMEOFFSET) : 0,
  parallel: 6,
  log: console.log
});

fs.src([src], { buffer: false, dot: true })
  // .pipe(conn.newer(dest)) // Disable newer and just reupload everthing, see below
  .pipe(conn.dest(dest));

// TODO: figure out why uploads don't work on newer files

// TESTING CUSTOM FILTER
// .pipe(
//   conn.filter(
//     "/usr/home/convergence/public_html/convergencedesignlab.org/web-resources/passion-to-purpose/**",
//     function(localFile, remoteFile, callback) {
//       // localFile and remoteFile are vinyl files.
//       // Check remoteFile.ftp for remote information.
//       // Decide wether localFile should be emitted and call callback with boolean.
//       // callback is a function( error, emit )
//       console.dir(remoteFile && remoteFile.ftp.name + " " + remoteFile.ftp.modify);
//       console.dir(localFile.stat.mtime);
//       return true;
//       // callback(null, emit);
//     }
//   )
// )

// DELETING
// console.log("Deleting");
// conn.rmdir(dest, err => {
//   console.log(err);
//   fs.src([src], { buffer: false, dot: true })
//   .pipe(conn.newer(dest))
//   .pipe(conn.dest(dest));
// });
