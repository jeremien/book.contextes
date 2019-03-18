import "./style.scss";

// import axios from 'axios';

// window.onload = function main() {

//     let data = [];
//     let loading = false;
//     const body = document.getElementsByTagName("body");

//     axios.get('http://contextes.io/publications/documents')
//          .then((response) => {
//             // console.log('chapitres', response.data)
//             data = response.data.documents;
//          })
//          .then(() => {

//             let cover = "<section id='cover'><h1>Printing in&nbsp;Relation to&nbsp;Graphic&nbsp;Art</h1></section>"

//             let html = "<section id='titre-chapitre' class='chapter' data-chapter='1'>";

//             data.forEach((item) => {
//                 html += "<p>" + item.contenu + "</p>";
//             });

//             html += "</section>";

//             html = cover + html;
//             console.log(html)

//             body[0].childNodes[0].innerHTML = html;
//          })
//          .catch((err) => console.log(err));

// }
