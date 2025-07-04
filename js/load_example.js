function loadExample() {
    const dropdown = document.getElementById('exampleDropdown');
    const selectedFile = dropdown.value;
    let text = '';

    if (selectedFile === 'example1') {
        text = 'Siti enjoys eating fried rice for lunch every day. She doesn\'t like coffee because it tastes bitter. Her friend Budi loves drinking milk in the morning. They often talk about their favorite foods during break time.';
        document.getElementById('contextInput').value = text; 
    } else if (selectedFile === 'example2') {
        text = 'Two friends were walking through the forest. Since it was dangerous, they promised to stay close to each other. They see a bear approaching them. One friend scurries up a tree, leaving the other one behind. The other friend decided to pretend to be dead. The bear approached him, smelled his ear and then left. The friend in the tree climbed down and asked the other friend what the bear had told him. He replies, "The bear simply advised against believing a false friend."';
        document.getElementById('contextInput').value = text;
    } else if (selectedFile === 'example3') {
        text = 'The Greek king Midas did a good deed for a Satyr. This prompted Dionysus, the god of wine, to grant him a wish. Midas asked for everything he touched to turn to gold. Dionysus warned him not to do so, but Midas could not be swayed. Midas excitedly started touching everything and turning them into gold. Soon, he became hungry. But he couldn\'t eat anything because even his food turned to gold. His beloved daughter saw him in distress and ran to hug him. However, she, too, turned to gold. He realised then the golden touch was not a blessing.';
        document.getElementById('contextInput').value = text;
    } else if (selectedFile === 'example4') {
        text = 'Anna lives in a small house with her grandmother. Every morning, she helps her grandmother water the flowers in their beautiful garden. The garden has many colorful roses, sunflowers, and tulips. Anna loves the smell of the roses the most. In the afternoon, they sit together and read books under the big apple tree. Her grandmother tells her stories about when she was young. Anna always listens carefully because she loves learning about the past.';
        document.getElementById('contextInput').value = text;
    } else if (selectedFile === 'example5') {
        text = 'Tom has a pet dog named Max. Max is a golden retriever with soft, yellow fur. Every day after school, Tom takes Max to the park near their house. They play fetch with a red ball for thirty minutes. Max can catch the ball very well and always brings it back to Tom. Sometimes other children come to pet Max because he is very friendly. Tom feels proud to have such a good dog as his best friend.';
        document.getElementById('contextInput').value = text;
    } else if (selectedFile === 'example6') {
        text = 'Sarah\'s favorite subject in school is science. She loves doing experiments with her teacher, Mrs. Johnson. Last week, they learned about how plants grow. They planted seeds in small pots and put them near the window. Every day, Sarah watered her plant and measured how tall it grew. After two weeks, her plant had three green leaves. Sarah was excited to see her plant growing bigger each day. She wrote everything in her science notebook.';
        document.getElementById('contextInput').value = text;
    } else if (selectedFile === 'example7') {
        text = 'The library in our town is a wonderful place. It has hundreds of books about different topics like animals, space, and adventure stories. Mrs. Brown is the librarian who helps everyone find the books they need. She has worked at the library for fifteen years. Children can borrow up to five books at a time for two weeks. There are also computers where people can search for information. Every Saturday, Mrs. Brown reads stories to young children in the special reading corner.';
        document.getElementById('contextInput').value = text;
    }
}