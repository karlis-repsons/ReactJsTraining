/* eslint-disable quotes, generator-star-spacing */

const displayName = 'ControlledScrolling_jy437';

import React from 'react';
import PropTypes from 'prop-types';

import DemoBase from 'demos/share/DemoBase/DemoBase';

import Styler from './ControlledScrollingStyler';

const settings = {
    presentation: {
        ui: {
            allDemoFitsInsideAnyContainer: false,
            maxContainerButtonsOverlapRemAt: { allSides: 1.5, top: 4.3, bottom: 4.3 }
        },
        ux: {
            animation: {
                mayAnimateContentSize: true
            }
        }
    }
};

const demoOwnProps = {
    countOfTextBlocks: PropTypes.number
};

const demoOwnPropDefaults = {
    countOfTextBlocks: 3
};

function* blocksSource() {
    yield [
        'It was morning, and the new sun sparkled gold across the ripples of a gentle sea. A mile from shore a fishing boat chummed the  water.  and  the word for Breakfast Flock flashed through  the  air,  till  a  crowd  of  a thousand seagulls came to dodge and fight for bits of food. It was another busy day beginning.',
        'But way off alone, out by himself beyond  boat  and  shore,  Jonathan Livingston Seagull was practicing. A hundred feet in the  sky  he  lowered his webbed feet, lifted his beak, and strained  to  hold  a  painful  hard twisting curve through his wings.  The  curve  meant  that  he  would  fly slowly, and now he slowed until the wind was a whisper in his face,  until the ocean stood  still  beneath  him.  He  narrowed  his  eyes  in  fierce concentration, held his breath, forced one...  single...  more...  inch... of... curve... Then his featliers ruffled, he stalled and fell.',
        'Seagulls, as you know, never falter, never stall. To stall in the air is for them disgrace and it is dishonor.',
        'But Jonathan Livingston  Seagull,  unashamed,  stretching  his  wings again in that trembling hard curve - slowing, slowing, and  stalling  once more - was no ordinary bird.',
        `Most gulls don't bother to learn more  than  the  simplest  facts  of flight - how to get from shore to food and back again. For most gulls,  it is not flying that matters, but eating. For this gull, though, it was  not eating that mattered,  but  flight.  More  than  anything  else.  Jonathan Livingston Seagull loved to fly.`,
        `This kind of thinking, he found, is not the way to  make  one's  self popular with other birds. Even his parents were dismayed as Jonathan spent whole days alone, making hundreds of low-level glides, experimenting.`
    ];

    yield [
        `He didn't know why, for instance, but when he flew at altitudes  less than half his wingspan above the water, he could stay in the  air  longer, with less effort. His glides ended not with  the  usual  feet-down  splash into the sea, but with a long flat wake as he touched the surface with his feet tightly streamlined against his body. When he  began  sliding  in  to feet-up landings on the beach, then pacing the length of his slide in  the sand, his parents were very much dismayed indeed.`,
        `"Why, Jon, why?" his mother asked. "Why is it so hard to be like  the rest of the flock, Jon? Why can't you leave low flying  to  the  pelicans, the albatross? Why don't you eat? Son, you're bone and feathers!"`,
        `"I don't mind being bone and feathers mom. I just want to know what I can do in the air and what I can't, that's all. I just want to know."`,
        `"See here Jonathan " said his father not unkindly. "Winter isn't  far away. Boats will be few and the surface fish will be swimming deep. If you must study, then study food, and how to get it. This  flying  business  is all very well, but you can't eat a glide, you know. Don't you forget  that the reason you fly is to eat."`,
        `Jonathan nodded obediently. For the next few days he tried to  behave like the other gulls; he really tried, screeching and  fighting  with  the flock around the piers and fishing boats, diving on  scraps  of  fish  and bread. But he couldn't make it work.`,
        `It's all so pointless, he thought, deliberately dropping  a  hard-won anchovy to a hungry old gull chasing him. I could  be  spending  all  this time learning to fly. There's so much to learn!`
    ];

    yield [
        `It wasn't long before Jonathan Gull was off by himself again, far out at sea, hungry, happy, learning.`,
        `The subject was speed, and in a week's practice he learned more about speed than the fastest gull alive.`,
        `From a thousand feet, flapping his wings as  hard  as  he  could,  he pushed over into a blazing steep dive toward the waves,  and  learned  why seagulls don't make blazing steep dives. In just six seconds he  was moving seventy miles per hour, the speed at which one's wing goes unstable on the upstroke.`,
        `Time after time it happened. Careful as he was, working at  the  very peak of his ability, he lost control at high speed.`,
        `Climb to a thousand feet. Full power straight ahead first, then  push over, flapping, to a vertical  dive.  Then,  every  time,  his  left  wing stalled on an upstroke, he'd roll violently left,  stall  his  right  wing recovering, and flick like fire into a wild tumbling spin to the right.`,
        `He couldn't be careful enough on that upstroke. Ten times  he  tried, and all ten times, as he passed through seventy miles per hour,  he  burst into a churning mass of feathers, out of control, crashing down  into  the water.`,
        `The key, he thought at last, dripping wet, must be to hold the  wings still at high speeds - to flap up to fifty and then hold the wings still.`,
        `From two thousand feet he tried again, rolling into  his  dive,  beak straight down, wings full out and stable from the moment he  passed  fifty miles per hour. It took tremendous strength, but it worked. In ten seconds he had blurred through ninety miles per hour. Jonathan  had  set  a  world speed record for seagulls!`,
        `But victory was short-lived. The instant he began  his  pullout,  the instant he changed the angle of his  wings,  he  snapped  into  that  same terrible uncontrolled disaster, and at ninety miles per hour  it  hit  him like dynamite. Jonathan Seagull exploded in midair and smashed down into a brickhard sea.`,
        `When he came to, it was well after dark, and he floated in  moonlight on the surface of the ocean. His wings were ragged bars of lead,  but  the weight of failure was even heavier on his back. He  wished,  feebly,  that the weight could be just enough to drug him gently down to the bottom, and end it all.`,
        `As he sank low in the water, a strange hollow  voice  sounded  within him. There's no way around it. I am a seagull. I am limited by my  nature. If I were meant to learn so much about flying, I'd have charts for brains. If I were meant to fly at speed, I'd have a falcon's short wings, and live on mice instead  of  fish.  My  father  was  right.  I  must  forget  this foolishness. I must fly home to the Flock and be content as  I  am,  as  a poor limited seagull.`,
        `The voice faded, and Jonathan agreed. The  place  for  a  seagull  at night is on shore, and from this moment forth, he vowed,  he  would  be  a normal gull. It would make everyone happier.`,
        `He pushed wearily away from the dark water and flew toward the  land, grateful for what he had learned about work-saving low-altitude flying.`,
        `But no, he thought. I am done with the way I  was,  I  am  done  with everything I learned. I am a seagull like every other seagull, and I  will fly like one. So he climbed painfully to a hundred feet  and  flapped  his wings harder, pressing for shore.`,
        `He felt better for his decision to be just another one of the  Flock. There would be no ties now to the force that  had  driven  him  to  learn, there would be no more challenge and no more failure. And it  was  pretty, just to stop thinking, and fly through the dark, toward the  lights  above the beach.`,
        `Dark! The hollow voice cracked in alarm. Seagulls never  fly  in  the dark!`,
        `Jonathan was not alert to listen. It's pretty, he thought.  The  moon and the lights twinkling on the water, throwing out  little  beacon-trails through the night, and all so peaceful and still...`,
        `Get down! Seagulls never fly in the dark! If you were meant to fly in the dark, you'd have the eyes of an owl! You'd  have  charts  for  brains! You'd have a falcon's short wings!`,
        `There in the night, a hundred feet in the  air,  Jonathan  Livingston Seagull - blinked. His pain, his resolutions, vanished.`,
        `Short wings. A falcon's short wings!`,
        `That's the answer! What a fool I've been! All I need is a tiny little wing, all I need is to fold most of my wings and  fly  on  just  the  tips alone! Short wings!`,
        `He climbed two thousand feet above  the  black  sea,  and  without  a moment for thought of failure and death, he brought his forewings  tightly in to his body, left  only  the  narrow  swept  daggers  of  his  wingtips extended into the wind, and fell into a vertical dive.`,
        `The wind was a monster roar at his  head.  Seventy  miles  per  hour, ninety, a hundred and twenty and faster still. The wing-strain  now  at  a hundred and forty miles per hour wasn't nearly as  hard  as  it  had  been before at seventy, and with the faintest twist of his  wingtips  he  eased out of the dive and shot above the waves,  a  gray  cannonball  under  the moon.`,
        `He closed his eyes to slits against the wind and rejoiced. A  hundred forty miles per hour! And under control! If I dive from five thousand feet instead of two thousand, I wonder how fast..`,
        `His vows of a moment before were forgotten, swept away in that  great swift wind. Yet he felt guiltless,  breaking  the  promises  he  had  made himself. Such promises are only for the gulls that  accept  the  ordinary. One who has touched excellence in his learning has no need of that kind of promise.`,
        `By sunup, Jonathan Gull was practicing again. From five thousand feet the fishing boats were specks in the flat blue water, Breakfast Flock  was a faint cloud of dust motes, circling.`,
        `He was alive, trembling ever so slightly with delight, proud that his fear was under control. Then without ceremony he hugged in his  forewings, extended his short, angled wingtips, and plunged directly toward the  sea. By the time he passed four thousand feet he had reached terminal velocity, the wind was a solid beating wall of sound against which he could move  no faster. He was flying now straight down, at two hundred fourteen miles per hour. He swallowed, knowing that if his wings unfolded at that speed  be'd be blown into a million tiny shreds of seagull. But the speed  was  power, and the speed was joy, and the speed was pure beauty.`,
        `He began his pullout  at  a  thousand  feet,  wingtips  thudding  and blurring in that gigantic wind, the boat and the crowd of  gulls  tilting and growing meteor-fast, directly in his path.`,
        `He couldn't stop; he didn't know yet even how to turn at that speed.`,
        `Collision would be instant death.`,
        `And so he shut his eyes.`,
        `It happened that morning, then, just  after  sunrise,  that  Jonathan Livingston Seagull fired directly through the center of  Breakfast  Flock, ticking off two hundred twelve miles per hour, eyes  closed,  in  a  great roaring shriek of wind and feathers. The Gull of Fortune smiled  upon  him this once, and no one was killed.`,
        `By the time he had pulled his beak straight up into the  sky  he  was still scorching along at a hundred and sixty miles per hour. When  he  had slowed to twenty and stretched his wings again at last,  the  boat  was  a crumb on the sea, four thousand feet below.`,
        `His thought was triumph. Terminal velocity! A seagull at two  hundred fourteen miles per hour! It was a breakthrough, the greatest single moment in the history of the Flock, and in that  moment  a  new  age  opened  for Jonathan Gull. Flying out to his lonely practice area, folding  his  wings for a dive from eight thousand feet, he set himself at  once  to  discover how to turn.`,
        `A single wingtip feather, he found, moved  a  fraction  of  an  inch, gives a smooth sweeping curve at tremendous speed. Before he learned this, however, he found that moving more than one feather  at  that  speed  will spin you like a ritIe ball... and Jonathan had flown the first  aerobatics of any seagull on earth.`,
        `He spared no time that day for talk with other  gulls,  but  flew  on past sunset. He discovered the loop, the slow roll, the  point  roll,  the inverted spin, the gull bunt, the pinwheel.`
    ];

    return;
}

export default class ControlledScrolling extends DemoBase {
    render() {
        const p = this.props;

        const styler = new Styler({ props: p });
        let formattedTextBlocks = [];
        let bi = 0;
        for (const textBlock of blocksSource()) {
            if (bi === p.countOfTextBlocks)
                break;

            let pi = 0;
            let formattedParagraphs = [];
            for (const paragraphText of textBlock) {
                formattedParagraphs.push(
                    <p style={styler.text.paragraph} key={pi}>{
                        paragraphText
                    }</p>
                );
                pi++;
            }

            formattedTextBlocks.push(
                <div style={styler.text.block} key={bi}>{
                    formattedParagraphs
                }</div>
            );

            bi++;
        }

        return (
            <div
                className='controlled scrolling demo jy437'
                style={styler.container.css}
            >
                <div style={styler.content.css}>

                    <div style={styler.author.css}>
                        Richard Bach&apos;s
               </div>

                    <h1 style={styler.title.css}>
                        Jonathan Livingston Seagull
               </h1>

                    <div style={styler.dedication.css}>
                        <div style={styler.dedication.text.css}>
                            To the real Jonathan Seagull,
                     who lives within us all.
                  </div>
                    </div>

                    <h2 style={styler.h2.css}>
                        Part One
               </h2>

                    {formattedTextBlocks}

                </div>
            </div>
        );
    }
}

ControlledScrolling.settings = settings;
ControlledScrolling.displayName = displayName;
ControlledScrolling.propTypes = Object.assign(
    {}, DemoBase.propTypes, demoOwnProps
);
ControlledScrolling.defaultProps = Object.assign(
    {}, DemoBase.defaultProps, demoOwnPropDefaults
);