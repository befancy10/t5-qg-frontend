function loadExample() {
    const dropdown = document.getElementById('exampleDropdown');
    const selectedFile = dropdown.value;
    let text = '';

    // She doesn\'t 
    if (selectedFile === 'example1') {
        text = 'I like fried chicken and noodle. My sister likes meatball, but she doesn\'t like rice. My brother doesn\'t like fried chicken. We all like noodle.';
        document.getElementById('contextInput').value = text; 
    } else if (selectedFile === 'example2') {
        text = 'Made likes noodle and meatball. He doesn\'t like rice. He likes orange juice. He doesn\'t like milk.';
        document.getElementById('contextInput').value = text;
    } else if (selectedFile === 'example3') {
        text = 'Joshua has breakfast at 7 o\'clock. He has fried chicken and rice. Joshua and his family have lunch at 12. They have noodle and orange juice for dinner.';
        document.getElementById('contextInput').value = text;
    } else if (selectedFile === 'example4') {
        text = 'Cici likes singing and watching TV. Made likes swimming, but he doesn\'t like reading. I like playing and riding a bike. Do you like swimming?';
        document.getElementById('contextInput').value = text;
    } else if (selectedFile === 'example5') {
        text = 'I like riding a bike on Sunday. My brother likes watching TV on Monday. We like playing football on Tuesday. What do you like doing on Sunday?';
        document.getElementById('contextInput').value = text;
    } else if (selectedFile === 'example6') {
        text = 'This is the classroom. That is the library. Is it the canteen? No, it isn\'t. It is the computer laboratory.';
        document.getElementById('contextInput').value = text;
    } 
    else if (selectedFile === 'example7') {
        text = 'My class is behind the office. The library is beside the canteen. The restroom is between the classroom and the prayer room. Where is the computer laboratory?';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example8') {
        text = 'I drink orange juice in the canteen. I study and write in the classroom. I play with my friends in the schoolyard. I read books in the library.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example9') {
        text = 'My classroom is clean and big. The schoolyard is wide, but the restroom is narrow. The library is large and clean. The canteen is small and dirty.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example10') {
        text = 'There are twenty books on the shelf. There is one clock on the wall. There are thirty-two pencils in the box. There are forty-five chairs in the classroom.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example11') {
        text = 'I am having breakfast now. My sister is singing in the bedroom. My brother is watching TV. What are you doing?';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example12') {
        text = 'There are sixty-seven English books in the library. There are eighty chairs in the classroom. The students have seventy-two pencils. There are ninety notebooks on the table.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example13') {
        text = 'My living room is beside the kitchen. The bathroom is behind the bedroom. The garage is in front of the house. The dining room is between the kitchen and the bedroom.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example14') {
        text = 'Cici cooks in the kitchen every morning. She reads a book in the living room every night. Her brother watches TV every day. Their father takes a bath in the morning.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example15') {
        text = 'There is a lamp on the table. The cupboard is beside the shelf. A picture and a clock are on the wall. The sofa is in front of the television.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example16') {
        text = 'The stove and the frying pan are in the kitchen. There are plates, spoons, and glasses on the table. The soap and the shampoo are in the bathroom. Kimi puts her toothbrush and toothpaste in a glass.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example17') {
        text = 'I can make fried egg in the kitchen. My brother can boil water. My sister can play the piano, but she cannot fry an egg. We can take a rest after lunch.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example18') {
        text = 'It\'s seven o\'clock and I have breakfast. At half past seven, I go to school. I study in the classroom at eight o\'clock. I have lunch at quarter past twelve.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example19') {
        text = 'I wake up at six in the morning. After that, I take a bath and brush my teeth. I have breakfast at half past six. I go to school after having breakfast.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example20') {
        text = 'He always gets up at 5 o\'clock. She usually has breakfast at 6 a.m. They sometimes go to school by bike. My brother never drinks milk in the morning.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example21') {
        text = 'I go to school by bike. My sister goes to school by bus. My father goes to work by motorcycle. Sometimes, we ride a pedicab around the neighborhood.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example22') {
        text = 'He goes to school by bike. My mother goes to the supermarket by bus. I go to the bookstore on foot. My father works at the office near the paddy field.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example23') {
        text = 'Bayu never forgets to wake up early. He always wakes up at six o\'clock and eats noodles for breakfast. After that, he goes to school by bus because it is far from his house. He usually studies math and science in the morning. After school, he goes home and eats lunch with his family. Then he helps clean the kitchen and feeds the cat. In the evening, he sometimes watches cartoons and eats dinner. On Sundays, he usually visits the supermarket on foot to buy snacks.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example24') {
        text = 'Fajar wakes up at six fifteen every morning. He can ride a bike, and he goes to school on it every day. His school is not far, and he enjoys the ride. Fajar can fix his bike if it\'s broken, but he cannot repair the brakes. At school, he studies hard and helps his friends. After school, he plays guitar and sings songs. He always finishes his homework at seven o\'clock.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example25') {
        text = 'Dino can play soccer very well. He practices every afternoon at four o\'clock with his school team. In the morning, Dino wakes up at six thirty and goes to school by bike. He lives near the school, so he never needs a car. He cannot swim, but he likes playing near the pool with his sister. Dino wants to join a swimming class next semester. He always does his homework before playing.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example26') {
        text = 'Every Sunday, Yogi wakes up at seven o\'clock. He eats a big breakfast with his family and drinks orange juice. After that, he goes to the supermarket by bus with his uncle. He buys milk, vegetables, and sometimes chocolate. At noon, he eats lunch with his cousins. In the afternoon, they play badminton in the park. Yogi always goes to bed early because he has school the next day.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example27') {
        text = 'There is a small garden behind the school library and beside the canteen. Flowers grow in rows, and there is a bench under a tree. Students often sit there during break time to read or talk. A small pond is in the corner with fish swimming in it. The garden is peaceful and full of butterflies. A path goes through the middle of the garden to the back gate. I like walking there in the afternoon after class.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example28') {
        text = 'The science lab in our school is a fun place to learn. It is large and clean, with six long tables and thirty-six stools. There are sixty test tubes and ten microscopes on the shelf. There is also one skeleton model in the corner. The windows are big and let in bright light. There is one whiteboard on the front wall. We do experiments every Wednesday. I enjoy exploring new things in the science lab.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example29') {
        text = 'Mira enjoys singing in her music class every Monday. She practices with her classmates and sings traditional and modern songs. Mira says, \"I like singing on Monday because I learn new songs.\" She doesn\'t like singing on Wednesday because she is tired from sports. Her teacher says she has a good voice. After class, Mira sings for her little brother at home. Music makes her smile.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example30') {
        text = 'Andi eats lunch at twelve o\'clock every day in the kitchen. His mother cooks rice, fried chicken, and sometimes noodles. Andi really likes rice and chicken, but he doesn\'t like noodles very much. He drinks sweet tea while eating. After lunch, he rests for a while before helping his mother prepare dinner.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example31') {
        text = 'During school holidays, Bima\'s family plans a trip to the zoo. They go by bus, which they catch near the local park. Bima likes to sit by the window and look at the trees, cars, and buildings. It takes about an hour to get to the zoo. When they arrive, Bima sees many animals like elephants, lions, and monkeys. He takes pictures and eats lunch near the elephant cage. Going by bus is Bima\'s favorite part of the trip because he loves to travel with his whole family.';
        document.getElementById('contextInput').value = text;
    }
    else if (selectedFile === 'example32') {
        text = 'Dita is a book lover, and she visits the library by bicycle every Wednesday after school. She wears her helmet and rides carefully along the sidewalk. The library is near the market and across from the post office. After parking her bike, Dita greets the librarian and finds a quiet place to read. She borrows three books and puts them in her backpack. After reading, she sometimes buys a snack before going home. Dita enjoys cycling because it makes her feel independent.';
        document.getElementById('contextInput').value = text;
    }
}