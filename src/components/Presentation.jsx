import wallpaper1 from "../assets/w1.jpg"

const Presentation = () => {
    return (
        <section className="h-screen relative flex md:h-[500px] ">
            <img src={wallpaper1} className="object-cover w-1/2 h-full" alt="wallpaper green and black" />

            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-3/4 text-my-C">
                <article>
                    <h2 className="font-bold text-2xl md:text-3xl">Bienvenue sur Ecoride</h2>
                    <p className="">
                        L’application pensée pour un avenir plus responsable. Ecoride transforme le covoiturage en un geste écologique quotidien : en partageant votre trajet, vous réduisez les émissions de CO₂,
                        désengorgez les routes et favorisez la solidarité locale. Simple, conviviale et engagée, notre plateforme met l’environnement au cœur de la mobilité.
                        Rejoignez une communauté de conducteurs et passagers qui roulent ensemble pour une planète plus verte 🚗💚
                    </p>
                </article>
            </div>
        </section>
    )
}

export default Presentation