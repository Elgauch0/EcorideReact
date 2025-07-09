import wallpaper1 from "../assets/w1.jpg"

const
    Home = () => {
        return (
            <div className="h-screen relative">

                <img src={wallpaper1} className="object-cover" />
                <div className="absolute ">
                    <h2>Ecoride</h2>
                    <article>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, recusandae aut! Aliquam aspernatur, atque quis obcaecati sunt dolores eos libero vo
                        luptatibus similique? Repellendus harum minus velit earum! Sint, magni? Esse tenetur pariatur quibusdam
                        error accusantium consequuntur, minus quidem eveniet illum?
                    </article>

                </div>


            </div>
        )
    }

export default Home