import React from "react";

const Hero = ({children, heroClass}) => {
    return(
        <header className={heroClass}>
            {children}
        </header>
    )
}

export default Hero;

Hero.defaultProps = {
    heroClass: "defaultHero"
}