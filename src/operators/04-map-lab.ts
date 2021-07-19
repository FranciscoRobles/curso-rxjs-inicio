import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

const text = document.createElement('div');
text.innerHTML = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non quam bibendum, gravida nisi a, congue orci. Nulla rhoncus est quis lorem elementum, ac ullamcorper odio auctor. Praesent vestibulum risus ligula, et accumsan ex pulvinar pellentesque. Integer velit turpis, vulputate eu tincidunt at, iaculis sed lectus. Mauris id arcu accumsan, pulvinar eros sit amet, malesuada magna. Morbi nec ullamcorper ex. Etiam sed mi blandit, ultrices diam non, accumsan purus. Curabitur suscipit metus nibh, in posuere mi blandit ac. Maecenas eleifend lorem a egestas posuere. Nunc varius egestas augue eget ornare. Morbi pharetra, lorem rutrum eleifend faucibus, dolor augue elementum ipsum, nec lobortis enim erat sed augue. Sed ullamcorper vulputate ex sed vulputate.
<br/><br/>
Phasellus sollicitudin elit eu metus sagittis iaculis. Ut purus leo, eleifend non turpis sit amet, sollicitudin sodales diam. Phasellus vulputate nunc quis ex semper egestas. Mauris sagittis pretium egestas. Morbi gravida euismod consequat. Morbi et libero erat. Nullam in commodo nunc, nec dapibus ligula. Maecenas tempus metus eros, at ultricies mauris pretium quis. Nullam eget arcu at diam pellentesque elementum. Morbi dolor lectus, viverra vel dolor fermentum, malesuada pretium neque. Aenean sed aliquet dolor, at tincidunt lorem.
<br/><br/>
Praesent imperdiet turpis elit, a tincidunt nulla tincidunt nec. Suspendisse potenti. Pellentesque auctor nulla nec pretium venenatis. Aliquam pretium ante lobortis mi semper, non cursus arcu volutpat. Cras magna erat, semper at convallis at, rutrum a turpis. Nam semper, leo eget pharetra pulvinar, nisi magna porta mauris, in consectetur arcu urna vel lacus. Morbi vitae neque sem. Praesent suscipit erat a tortor cursus volutpat.
<br/><br/>
Ut consequat diam odio, ut tristique nibh molestie ut. Nunc pharetra elementum enim quis tincidunt. Nullam molestie ultrices velit id imperdiet. Sed dolor urna, facilisis id orci in, blandit mollis odio. Etiam auctor interdum augue a lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer consequat, sem sed accumsan dictum, nisi erat dapibus ante, at dictum turpis dui vitae enim. Vestibulum et consectetur diam, sed tempor lorem. Proin interdum, ipsum eget feugiat semper, magna augue condimentum arcu, vel lacinia nunc sem pharetra augue. Praesent dolor velit, bibendum ut feugiat id, eleifend vitae dui. Praesent aliquam felis a nulla consequat, eu volutpat diam malesuada.
<br/><br/>
Suspendisse egestas ullamcorper pulvinar. Phasellus eget arcu id odio sollicitudin sagittis in sed nibh. Donec laoreet elementum metus. Nulla commodo id eros lobortis porta. Cras eget nulla vitae erat viverra luctus. Nunc suscipit pharetra mi, vel lacinia sem fermentum sollicitudin. Etiam eget rhoncus ex, ac placerat lorem. Nam vehicula risus id scelerisque faucibus. Donec a ex nec nisl maximus egestas sed et eros. Donec et maximus diam, vitae tincidunt augue. Etiam nunc est, feugiat quis metus non, mollis maximus urna. Nulla non metus sed sapien dapibus lacinia sit amet vitae nisl. Sed tempus ut lectus ac porta. Maecenas ac elit a mauris porta bibendum.`

const body = document.querySelector('body');
body.append( text );

const progressBar = document.createElement('div');
progressBar.setAttribute('class', 'progress-bar');
body.append( progressBar );

//Function to calculate progress
const calculateScroll = event => {
    const {
        scrollTop, 
        scrollHeight, 
        clientHeight
    } = event.target.documentElement
    return (scrollTop/(scrollHeight - clientHeight)) * 100
}

//Streams
const scroll$ = fromEvent<Event>(document, 'scroll');
const progress$ = scroll$.pipe(
    map<Event, number>( event => calculateScroll(event))
);
progress$.subscribe( porcentaje => {
    progressBar.style.width = `${ porcentaje }%`;
})