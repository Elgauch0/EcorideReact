import wallpaper1 from "../assets/w1.jpg";

const Presentation = () => {
    return (
        <section className="h-screen relative flex md:h-[500px]">
            <figure className="w-1/2 h-full">
                <img
                    src={wallpaper1}
                    className="object-cover w-full h-full"
                    alt="Paysage vert et noir symbolisant l'engagement écologique"
                />
                {/* <figcaption>Optionnel : légende de l'image</figcaption> */}
            </figure>

            <article
                className="absolute top-20 left-1/2 transform -translate-x-1/2 w-3/4 text-my-C"
            >
                <h2 className="font-bold text-2xl md:text-3xl">
                    Bienvenue sur Ecoride
                </h2>
                <p>
                    L’application pensée pour un avenir plus responsable. Ecoride transforme le covoiturage en un geste écologique quotidien : en partageant votre trajet, vous réduisez les émissions de CO₂,
                    désengorgez les routes et favorisez la solidarité locale. Simple, conviviale et engagée, notre plateforme met l’environnement au cœur de la mobilité.
                    Rejoignez une communauté de conducteurs et passagers qui roulent ensemble pour une planète plus verte 🚗💚
                </p>
            </article>
        </section>
    );
};

export default Presentation;
