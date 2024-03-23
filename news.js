const apikey = '58b88a4bdb9f4bfc9ce162c490ad8180';
        const blogcontainer = document.getElementById("blog-container");
        const searchField = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');

        async function fetchRandomNews() {
            try {
                const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
                const response = await fetch(apiurl);
                const data = await response.json();
                return data.articles;
            } catch (error) {
                console.error("error fetching random news", error);
                return [];
            }
        }

        searchButton.addEventListener("click", async () => {
            const query = searchField.value.trim();
            if (query !== "") {
                try {
                    const articles = await fetchNewsQuery(query);
                    displayblock(articles);
                } catch (error) {
                    console.log("error fetching news by query", error);
                }
            }
        });

        async function fetchNewsQuery(query) {
            try {
                const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
                const response = await fetch(apiurl);
                const data = await response.json();
                return data.articles;
            } catch (error) {
                console.error("error fetching news by query", error);
                return [];
            }
        }

        function displayblock(articles) {
            blogcontainer.innerHTML = "";
            articles.forEach(article => {
                const blogCard = document.createElement("div");
                blogCard.classList.add("blog-card");
                const img = document.createElement("img");
                img.src = article.urlToImage;
                img.alt = article.title;
                const title = document.createElement("h2");
                const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
                title.textContent = truncatedTitle;
                const description = document.createElement("p");
                const truncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
                description.textContent = truncatedDes;

                blogCard.appendChild(img);
                blogCard.appendChild(title);
                blogCard.appendChild(description);
                blogCard.addEventListener("click", () => {
                    window.open(article.url, "_blank");
                });
                blogcontainer.appendChild(blogCard);
            });
        }

        (async () => {
            try {
                const articles = await fetchRandomNews();
                displayblock(articles);
            } catch (error) {
                console.error("error fetching random news", error);
            }
        })();