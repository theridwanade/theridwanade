export const HomePage = () => {
  return (`
    <div class="main">
      <div class="hs-image-main">
        <img class="hs-image" src="/theridwanade.jpg" alt="Ridwan" />
      </div>

      <h1>Hi, I'm Ridwan.</h1>

      <p>
        I'm a programmer and computer science enthusiast. I build open-source projects and software that educate and showcase the marvels of computer science.
      </p>

      <p>
        Check out my projects and contributions on 
        <a href="https://github.com/theridwanade" target="_blank">GitHub</a>.
      </p>

      <p>
        I am currently pursuing my degree in Library and Information Science at the University of Ilorin, where I research information management and dissemination. I aim to combine my computer science skills and academic knowledge to create innovative solutions that benefit society.
      </p>

      <p>
        Read my articles on science, society, technology, and other topics I find interesting on 
        <a href="https://medium.com/@theridwanade" target="_blank">Medium</a>.
      </p>

      <p>
        You can also read my technical articles on 
        <a href="https://dev.to/theridwanade" target="_blank">dev.to</a>.
      </p>

      <p>
        Follow my thoughts and updates on X (formerly Twitter) at 
        <a href="https://twitter.com/theridwanade" target="_blank">@theridwanade</a>.
      </p>

      <p>
        Connect with me professionally on 
        <a href="https://linkedin.com/in/theridwanade" target="_blank">LinkedIn</a>, or reach out via 
        <a href="mailto:ridwan@theridwanade.me">email</a> for projects, research, events, or just to say hello.
      </p>

      <p>
        To stay updated on my projects, articles, and other work, subscribe to my 
        <a href="https://theridwanade.substack.com" target="_blank">newsletter</a> to get emails whenever I publish something new.
      </p>

      <iframe
        src="https://theridwanade.substack.com/embed"
        width="100%"
        height="320"
        style="border:1px solid #EEE; background:white;"
        frameborder="0"
        scrolling="no"
      ></iframe>

      <footer style="margin-top:40px; padding:20px 0; text-align:center; border-top:1px solid #EEE; color:#555; font-size:14px;">
        <p>© ${new Date().getFullYear()} Ridwan Ade. All rights reserved.</p>
        <p>
          Follow me on 
          <a href="https://github.com/theridwanade" target="_blank">GitHub</a>, 
          <a href="https://linkedin.com/in/theridwanade" target="_blank">LinkedIn</a>, 
          <a href="https://medium.com/@theridwanade" target="_blank">Medium</a>, 
          <a href="https://twitter.com/theridwanade" target="_blank">X (Twitter)</a>
        </p>
      </footer>
    </div>
  `);
}
