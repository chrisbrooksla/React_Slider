import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
function App() {

  // set up state to use to array from data.js("data")...
  const [people, setPeople] = useState(data)

  // set up the state for the index of the slider...
  const [index,setIndex] = useState(0)



  // checks the state value, and will run based on one of two conditions...
  useEffect(() =>{
    const lastIndex = people.length - 1;

    // if index is at negative, reset it to the last item of the array...
    if(index < 0){
      setIndex(lastIndex)
    }
    // if index goes past the last item in the array, set it back to the beginning...
    if(index > lastIndex){
      setIndex(0);
    }
  }, [index, people]);



  // sets up the auto slide to run every 3 seconds and increase the index...
  useEffect(() => {
    let slider = setInterval(() =>{
      setIndex(index + 1);
    }, 3000);
    // clearInterval resets the interval countdown once the index changes...
    return ()=> clearInterval(slider);  
  }, [index])



  return <section className="section">
    <div className="title">
        <h2>
          {/* h2 at the top... */}
          <span>/</span>reviews
        </h2>
    </div>

    <div className="section-center">

      {/* map through the array we named "people"... */}
      {people.map((person,personIndex) =>{

        // destructure the array object to access all properties....
        const {id, image, name, title, quote} = person;

        // all the articles are getting the "nextSlide" (to the right) class by default...
        let position = "nextSlide";

        // if the index for the item matches the index in our state value, position it in the center with the "activeSlide" class...
        if(personIndex === index){
          position = "activeSlide";
        }

        // if the index for the item is one less than the current index, OR if the index is at zero (default) AND the item is the last item
        // in the array, position it to the left with the "lastSlide" class...
        if(personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)){
          position = "lastSlide";
        }

        // return an article for each object in the array with the image, name, title, and quote...
        // we give the article a className equal to the designated position...
        return <article className={position} key ={id}>
          <img src={image} alt={name} className="person-img"/>
          <h4>{name}</h4>
          <p className="title">{title}</p>
          <p className="text">{quote}</p>

          {/* add quote icon... */}
          <FaQuoteRight className="icon" />
        </article>
      })}

{/* create the buttons for the slider with left and right chevrons... */}
      {/* set the index to decrease by 1 */}
      <button className="prev" onClick={() => setIndex(index - 1)}>
        <FiChevronLeft />
      </button>
      {/* set the index to increase by 1 */}
      <button className="next" onClick={() => setIndex(index + 1)}>
        <FiChevronRight />
      </button>
    </div>
  </section>
}

export default App;
