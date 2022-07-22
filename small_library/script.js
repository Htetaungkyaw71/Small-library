
            document.addEventListener("DOMContentLoaded",()=>{   
                // let b = [];
                // updateStorage(b)
                // localStorage.setItem('library',JSON.stringify(b));
                let books = JSON.parse(localStorage.getItem("library"))
                document.getElementById('submitForm').onsubmit = (e)=>{
                        e.preventDefault()
                        let title = document.getElementById('title').value;
                        for(let book of books){
                            if(book.title == title){
                                alert("This book is already added!")
                                return false;
                            }
                        }
                        let author = document.getElementById('author').value;
                        let pages = document.getElementById('pages').value;
                        let book = {
                            "title":title,
                            "author":author,
                            "pages":pages,
                            "status":"unread"
                        }
                   
                        books.push(book)
                        let a = document.createElement('div')
                        a.id = `${book.title}`
                        a.className = "card"
                        a.innerHTML = `
                        <p>
                        <b>${book.title}</b>
                        <br>
                        <br>
                        Author : ${book.author}.  
                        <br>
                        <br>
                        Pages : ${book.pages}. 
                        </p>
                       <div>
                       <button class="read" id="${book.title}">${book.status}</button>
                       <button class="btn" id="${book.title}">remove</button>       
                       </div>
                                
                        `
                        document.getElementById('librarys').appendChild(a)
                        updateStorage(books)

                        remove(book)  
                        updateStorage(books)  
                        console.log(book.title)     
                        read(findIndex(books,book.title))                         
                    }

          
                    
                // Render
                for(let i=0;i<books.length;i++)
                        {
                            
                            let a = document.createElement('div')
                            a.id = `${books[i].title}`
                            a.className = "card"
                            a.innerHTML = `
                        <p>
                        <b>${books[i].title}</b>
                        <br>
                        <br>
                        Author : ${books[i].author}
                        <br>
                        <br>
                        Pages : ${books[i].pages}
                        </p>
                       <div>
                       <button class="read" id="${books[i].title}">${books[i].status}</button>
                       <button class="btn" id="${books[i].title}">remove</button>       
                       </div>
                                
                        `
                            document.getElementById('librarys').appendChild(a)    
                            console.log(books[i])
                                      
                            remove(books[i])
                            updateStorage(books)       
                            read(findIndex(books,books[i].title))
                        }
                // Render

                function remove(book){
                    document.querySelectorAll(".btn").forEach(btn=>{
                        btn.onclick = ()=>{ 
                            console.log(book)                           
                            let books = JSON.parse(localStorage.getItem("library"))   
                            let rm_e = document.getElementById(`${btn.id}`)
                            rm_e.remove();
                            books.splice(findIndex(books,btn.id),1)       
                            updateStorage(books) 
                            }
                        })
                }


                // Find Index
                function findIndex(books,title){
                    console.log(title)
                        for(book of books){        
                                if(book.title == title){
                                    return books.indexOf(book)
                                }
                            }
                        }
                // Find Index

                })

                function read(bookIndex){
                    
                    document.querySelectorAll(".read").forEach(r=>{
                        r.onclick = ()=>{
                            console.log(r.id)
                            let books = JSON.parse(localStorage.getItem("library"))
                            console.log(books)
                            console.log(bookIndex)
                            for(let book of books){
                                if(book.title == r.id){
                                    if(book.status === "unread"){
                                        book.status = "read";
                                        r.innerHTML = "read";
                                        updateStorage(books)
                        
                                    }else{
                                        book.status = "unread";
                                        r.innerHTML = "unread";
                                        updateStorage(books)
                                }
                                }
                            }
                         

                            
                        }
                    })
                    
                }


                function updateStorage(obj){
                    localStorage.setItem("library",JSON.stringify(obj));
                }
     

          