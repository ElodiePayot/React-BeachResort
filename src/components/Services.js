import React, {Component} from 'react';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa"
import Title from "./Title";

export default class Services extends Component {
    state={
        services: [
            {
                icon: <FaCocktail />,
                title: "free cocktails",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                icon: <FaHiking />,
                title: "Endless adventures",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                icon: <FaShuttleVan />,
                title: "Free shuttle",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                icon: <FaBeer />,
                title: "Strongest beers",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
        ]
    }
    render() {
        return(
            <section className="services">
                  <Title title="services" />
                  <div className="services-center">
                      {this.state.services.map((item, idx) => {
                          return <article key={idx} className="service">
                              <span>{item.icon}</span>
                              <h6>{item.title}</h6>
                              <p>{item.text}</p>
                          </article>
                      })}
                  </div>
            </section>
        )
    }
}