
import app from "./app";



function main() {
    try {
        
        
        
        app.listen(3000, 'localhost', async () => {
            console.log('starting server')
        })
    } catch (err) {
        
        
        console.error('Starting server Error', err)
    }
}


main()