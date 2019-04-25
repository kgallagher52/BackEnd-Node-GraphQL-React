# Node-GraphQL-React

## Technologies
    1. Node

    2. Express

    3. Mongoose

    4. MongoDb

    5. Mlab

    6. GraphQL


# Resources
https://youtu.be/ed8SzALpx1Q

# Root Queries
How we get into the graph the entry points

#Notes
    1. When making a query you must use "", not ''
    
    2. Query example of relationship data
        {
            book(id:2){
                name
                genre
                author{
                    name
                    age
                }
            }
        }
