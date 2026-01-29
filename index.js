const http = require("http");
const url = require("url");
const fs = require("fs");
const animalBreeds = require(`./group/animals.js`);
const gameList = require(`./group/game.js`);
const animationList = require(`./group/animation.js`);
const movieList = require(`./group/movie.js`);
const tvShowList = require("./group/tv-show.js");

const header = (pageTitle = "") => `<header><h1>${pageTitle}</h1></header>`;
const navigation = () => 
    `<nav style="background-color: #718355; padding: 10px;">
        <a href="/" style="color: white; text-decoration: none; margin-right: 15px;">Home</a>
        <a href="/animals" style="color: white; text-decoration: none; margin-right: 15px;">Animal</a>
        <a href ="/animation" style="color: white; text-decoration: none; margin-right: 15px;">Animation</a>
        <a href ="/tv-show" style="color: white; text-decoration: none; margin-right: 15px;">TV-show</a>
        <a href ="/game" style="color: white; text-decoration: none; margin-right: 15px;">Game</a>
        <a href ="/movie" style="color: white; text-decoration: none; margin-right: 15px;">Movie</a>
    </nav>`;

const footer = (FootTitle ="") =>
    `<footer style ="width :100%; background-color:#718355">
        <h3 style="color: white; text-decoration: none;">${FootTitle}</h3>
        <p style="font-size: 14px; color: white; text-decoration: none;"">© 2026  my collection of favorites.</p>
        <div>
            <a href="mailto:dobin7955@gmail.com" style="color: white; text-decoration: none;">Email Me</a> | 
            <a href="https://github.com/DobeenKim" style="color: white; text-decoration: none;">GitHub</a>
        </div>
    </footer>`;

http.createServer((req,res) => {

    const address = url.parse(req.url, true)
    const currentPath = address.pathname;
    res.writeHead(200, {"content-type" : "text/html; charset=utf-8"});
    res.write(navigation())

    // Home Route
    if (currentPath === "/") {
        res.write(header("Welcome to my collection of favorites!"))
        res.write("<h2>Explore my world of TV shows, movies, animations, games, and animals!</h2>")
        res.write(footer())
        res.end()
        return;
    }

    //Animal Route
    else if (currentPath === "/animals") {
        res.write("<div>")
        res.write(header("This is a Animal page"))
        res.write("<h3>I will introduce about my favorite animals!<h3>")
        res.write("</div>")
        
        animalBreeds.forEach(animal => {
            res.write(`<p><a href = "/animals?species=${animal.name.toLowerCase()}">${animal.name}</a></p>`)
        })

        const searchQueries = address.query
        const selectedAnimal = searchQueries.species

        if(selectedAnimal) {
            const foundAnimal = animalBreeds.find(animal => animal.name.toLowerCase() === selectedAnimal); 
            if(foundAnimal) {
                res.write(`
                    <div style ="width :100%; background-color:beige">
                    <p>Name: ${foundAnimal.name}</p>
                    <p>Personality: ${foundAnimal.Personality}</p>
                    <p>Origin: ${foundAnimal.origin}</p>
                    </div>
                `)
            } else {
            const ifError = false;
            res.write("<p style='color:red;'>Oops! Something went wrong.</p>");
            }
            res.write(footer());
            res.end();
            return
        
        } else {
            res.write("<p>Please click a name to see details.</p>");
        }
        res.write(footer())
        res.end()
        return
    }

// Animation Route
    else if(currentPath.includes("/animation")) {
        res.write("<div>")
        res.write(header("This is a Animation page"))
        res.write("<h3>I will introduce about my favorite Animation!</h3>")
        res.write("</div>")

        const searchTerm = address.query

        let filePath = `./contentFiles/animation.html`

        if(searchTerm.list === "totoro") {
            filePath = `./contentFiles/totoro.html`
        }

        fs.readFile(filePath, (err, data) => {
            if(err) {
                res.write("<h1>404 Not Found</h1>")
            } else {
                res.write(data)
            }
            res.write(footer())
            res.end()
        })
        return
    }

    //Movie Route
    else if (currentPath === "/movie") {
        res.write("<div>")
        res.write(header("This is a movie page"))
        res.write("<h3>I will introduce about my favorite movies!<h3>")
        res.write("</div>")

        movieList.forEach(movie => {
            res.write(`<p><a href = "/movie?title=${movie.name.toLowerCase()}">${movie.name}</a></p>`)
        })

        const searchQueries =address.query
        const selectedMovie = searchQueries.title

        if(selectedMovie) {
            const foundMovie = movieList.find(movie => movie.name.toLowerCase()===selectedMovie)
            if(foundMovie) {
                res.write(`
                    <div style ="width :100%; background-color:beige">
                    <p>Name: ${foundMovie.name}</p>
                    <p>Genre: ${foundMovie.genre}</p>
                    <p>Country: ${foundMovie.country}</p>
                    <p>Description: ${foundMovie.description}</p>
                    </div>
                `)
            } else {
                const ifError =false;
                res.write("<p style='color:red;'>Oops! Something went wrong.</p>");
            }
            res.write(footer())
            res.end()
            return
        } else {
            res.write("<p>Please click a name to see details.</p>");
            res.write(footer())
            res.end()
        }
        res.end()
        return
    }

        //Tv show Route
    else if (currentPath === "/tv-show") {
        res.write("<div>")
        res.write(header("This is a Tv show page"))
        res.write("<h3>I will introduce about my favorite Tv show!<h3>")
        res.write("</div>")

        tvShowList.forEach(tvshow => {
            res.write(`<p><a href = "/tv-show?title=${tvshow.name.toLowerCase()}">${tvshow.name}</a></p>`)
        })

        const searchQueries =address.query
        const selectedTvshow = searchQueries.title

        if(selectedTvshow) {
            const foundTvshow = tvShowList.find(tvshow => tvshow.name.toLowerCase()===selectedTvshow)
            if(foundTvshow) {
                res.write(`
                    <div style ="width :100%; background-color:beige">
                    <p>Name: ${foundTvshow.name}</p>
                    <p>Genre: ${foundTvshow.genre}</p>
                    <p>Country: ${foundTvshow.country}</p>
                    <p>Description: ${foundTvshow.description}</p>
                    </div>
                `)
            } else {
                const ifError =false;
                res.write("<p style='color:red;'>Oops! Something went wrong.</p>");
            }
            res.write(footer())
            res.end()
            return
        } else {
            res.write("<p>Please click a name to see details.</p>");
            res.write(footer())
            res.end()
        }
        res.end()
        return
    }

    //Game Route
    else if (currentPath.startsWith("/game")) {

        const pathParts = currentPath.split("/");
        const selectedGameName = pathParts[2]

        res.write("<div>")
        res.write(header("This is a game collections page"))
        res.write("</div>")

        if(selectedGameName) {
            const foundGame = gameList.find(game => game.name.toLowerCase()===selectedGameName.toLowerCase())
            
            if(foundGame) {
                res.write(`
                    <div>
                    <p>Name: ${foundGame.name}</p>
                    <p>Genre: ${foundGame.type}</p>
                    <p>Country: ${foundGame.Company}</p>
                    </div>
                `)

                const filePath = `./contentFiles/${selectedGameName.toLowerCase()}.html`;
                if (fs.existsSync(filePath)) {
                    const htmlContent =fs.readFileSync(filePath, "utf8");
                    res.write(`<div>${htmlContent}</div>`);
                } else {
                    res.write("<p>No detailed description</p>")
                }
            }  else {
                res.write("<h2>Game not found</h2>")
            }
            res.write(`<p><a href ="/game"> Back to the list</a></p>`);
            res.write(footer())
            res.end()
            return
        } else {
            res.write("<h3>I will introduce about my favorite games!</h3>");
            gameList.forEach(game => {
                res.write(`<p><a href="/game/${game.name.toLowerCase()}">${game.name}</a></p>`)
            })
            res.write(footer())
            res.end()
            return
        }
    }

    else {
        res.write(header("404 Not Found"));
        res.write(footer())
        res.end()
    }

}).listen(2026,() => console.log("Listening on port 2026"))