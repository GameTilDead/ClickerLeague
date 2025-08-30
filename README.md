# WELCOME TO CLICKER LEAGUE!

WARNING: Spoilers (including for ZC), but all technically reachable within your first CL match.

NOTE: If you have little or no experience with Zenith Clicker or TETR.IO's Quick Play 2, it is **highly recommended** to brush up on those first! Otherwise, it'll be _very hard_ to figure out how this works.
[tetr.io](https://tetr.io)
[Zenith Clicker](https://github.com/MrZ626/ZenithClicker)

**Clicker League** is a game inspired by QP2's mod selection screen, but more directly by Zenith Clicker. It essentially recreates TETR.IO's Tetra League with Zenith Clicker's mechanics and [other stuff I came up with at 3:30 one night in the tetrio discord](https://discord.com/channels/673303546107658242/1345623182513541174/1359432208871325697).
Much is shared between the three games, but this is a derivative of a fangame (Zenith Clicker) of a mechanic (mods) within one part (Quick Play) of a single modern Tetris game (tetrio). Some familiarity has to be maintained, obviously.

Powered by Python, among other things ~~but not Lua. Sorry MrZ~~

## Credits
GameTilDead - Lead Producer

MrZ - ZC Lead Producer & Some card designs

osk - TETR.IO Founder & Lead Producer

Garbo - TETR.IO Game Designer

Dr Ocelot - TETR.IO Audio Designer

FMichael, Spritzy Sheep, Lavender - Some text

CreeperCraftYT - Some card designs & Mod icons

(several producers) - Music


## How to Play
### Starting Out
On first launch, you'll be assessed with a Pre-League Calibration. The calibration is essentially Zenith Clicker gameplay and is necessary to determine an approximate skill level to match you with your first opponent.

### IMPORTANT: Terms + Shorthand
**It will be harder to understand many things in-game and some community discussion without knowing how we talk.** These lists are subject to change.

All mods are referred to by the following (in order of which they appear, left to right):

EX: Expert / The Emperor

NH: No Hold / Temperance

MS: Messy / Wheel of Fortune

GV: Gravity / The Tower

VL: Volatile / Strength

DH: Double Hole / The Devil

IN: Invisible / The Hermit

AS: All-Spin / The Magician

DP: Duo ("dual player") / The Lovers

"r" or "u" can appear before a shortened mod to indicate its reverse or ultra reverse version, respectively; for example rEX = reverse expert, uIN = ultra invisible

Check the "Mods" section under "Mechanics" for info on what these do!

\-

Other abbreviations:

CL = Clicker League

CR = Clicker Rating

ZC = Zenith Clicker

TL = Tetra League

QP(2) = Quick Play (the new one - a distinction is made when referring to the old one)

\-

attack: Core mechanic that boosts altitude in calibration and decides who wins in the Clicker League
//
_"The only reason attack exists in ZC is because, in tetrio, you would actually send lines to other players and it determined several other things."_

b2b: "Back-to-Back"; the number of times you've submitted the correct combo on the first try; commonly formatted as "N b2b" or "b2b xN"
//
_"ZC implemented a max b2b after **someone** introduced an overpowered strategy with rDP."_

break: Reset b2b by making a mistake before submitting the correct combo
//
_"You don't wanna break before reaching 4 b2b, that just wastes time."_

burn: Card effect in (r/u)AS where, if you flip it, other cards get flipped
//
_"Most players who don't know **real magic** find it impossible to undo the consequences of flipping a burnt card in rAS."_

commit: Submit a mod combo
//
_"Committing wrong is worse each time you do it consecutively, and gets worse over time as well."_

cs: "Climb speed"; a mechanic in calibration derived from ZC/tetrio that determines the altitude you gain over time and per correct submission, also known as "rank"
//
_"What's that super broken mechanic where you gain a ton of cs?"_

combo: A combination of cards in any context.
//
_"Why has ZC's daily challenge been the same combo 3 times within two months??"_

damage: Reduction in the hp bar
//
_"It's necessary for progression that you take more damage over time."_

exp: Progress in the cs bar, also known as "xp"
//
_"Each rank requires 4 more xp than the last to finish. Unless..."_

hp: The amount of damage you can take before losing
//
_"The hp bar kinda looks like a stylistic choice when full, the way some people see it. They don't know it's the hp bar until you take damage."_

int: Mess up, usually used in context of something significant, often before or during it; also known as "throw"
//
_"The whole point of Divine Rejection is inting Floor 10. The closer to the barrier you stop at, the better your achievement badge."_

margin (time): The time after the first time-based effect; in ZC this is "fatigue" and it can also refer to the individual effects or times they happen
//
_"Margin time makes both TL and CL matches a whole lot more interesting. Who'd want the round to drag on for 10 minutes without a sign of ending?"_

pass: Submit the correct combo; used with "(im)perfect" when talking about whether or not a mistake was made prior to the combo being correct
//
_"I hate getting 'Pass 12 times imperfectly' when reviving because it's annoying and sometimes impossible!"_

prompt: The current task you need to complete in order to continue or finish a revival in (r/u)DP; also known as "task"
//
_"Did you know certain prompts can only appear after you've reached a certain floor in ZC?"_

quest: A required combo to commit; your gateway to attack
//
_"GTD has had the world record for shortest time to pass 40 quests for a long time now"_

spike: A large amount of attack produced at once or very quickly; is also a verb for producing said attack
//
_"Beware of those who can do a 26 spike on their mouse, and especially those who can switch to keyboard and do the same without a sweat."_

surge: The attack produced from breaking at least 4 b2b
//
_"The faster you play, the less surge is necessary to annihilate your opponent."_

tank: Take damage, especially if by choice
//
_"If you see your opponent send a strong attack while struggling, it's sometimes best to tank it and counterattack instead of cancelling it out."_

wound: The result of flipping a burnt card in (r/u)AS
//
_"It's funny to still call it a 'wound' in uAS."_

### Calibration
This is your goodbye to the Zenith Tower. Given unlimited health, you must reach Floor 10 once while you are assessed based on your performance. There will be no mods or fatigue - just a final climb and the building anticipation of playing your first matches in the League. After reaching Floor 10, you can check your (very roughly) estimated CR and other stats in the respective page.

<details>
<summary>
(SPOILER) How can you increase your estimated CR?
</summary>
---

You can practice with ZC if you don't feel ready to enter the League with your current skill. Now, onto what the calibration tracks:

First and foremost, not dying. Even though you are invincible, your health can still reach 0 and the calibration will take note of when, how many times, and how long you did so for.

If you manage to enter GIGASPEED and *especially* TERASPEED, you will be seen as more skilled and will be ranked even higher if you reach Floor 10 with either.

The amount of time you spend is very important, especially given the above. The longer you take, the lower ranked you will be. Speed is highly rewarded.

Having a higher rate of perfect passes will increase your estimated CR. Not the number, the percentage - I see you, plonkers.

While less considered, b2b is still a factor that contributes to your estimation. The more you manage to build at once, the better.

---
</details>

### Clicking the League
NOTE: Given the low player count of ZC and CL, it might be difficult or even impossible to find a good match sometimes. As the community grows, this will slowly be resolved (invite people to play if you enjoy CL!), but for now, you might have unfair matches.

After calibrating, queue up with the big button to find your first match! Once an opponent is found, the two of you will be set to play in a first to X match with X being determined from the (higher-)ranked opponent. The number of points required to win is determined just like in TETR.IO's Tetra League: 3 if the highest rank of the two players is below S-, 5 if highest rank is between S- and SS, and 7 if highest rank is above SS. If both players are unranked, the number of required points will be set based on what each player got in calibration. Peak ranks are not considered, so you can switch between FT3/FT5 or FT5/FT7 matches after the respective demotion.

The goal of the game is simple: select the correct cards to match the bottommost combo in the queue. Keep matching with enough speed and strategy to overwhelm your opponent and reduce their HP to 0 and take that round's point. However, certain mechanics are in place to make this more interesting:

\-\-\-

\- Garbage: You guessed it. Just like in TL, any attack sent by the opponent takes a bit to reach your side - when it arrives, you can cancel some with your next input (moving the mouse doesn't count), or take the respective amount of damage. For those familiar with ZC, you might think it's impossible to have a good round with the kind of attack being sent, therefore, attack produced from surges is nerfed.

\- Mod effects: After reaching at least b2b x8, you can break to force mods onto your opponent. They are determined somewhat randomly, but if you pay attention to your past quests you might be able to force the more difficult ones. The number of mods sent is determined by `mods = floor(surge/8)`, and received effects last for a base 26s and shorten per pass (-1260ms/perfect, -626ms/imperfect).

\- Margin time: Another classic TL feature. Just like the source, things start happening after 2 minutes...

+ 2'00" - _Your weakness starts showing..._ Quests will gradually become more difficult and damage from any source will start becoming larger.
+ 2'30" - _You feel yourself losing focus..._ The color saturation starts decreasing ever so slightly, stopping at 62%.
+ 3'00" - _It could hit you at any second..._ The surge divider becomes 7: `mods = floor(surge/7)`
+ 3'30" - _Each sound becomes frightening..._ The surge divider becomes 6.2.
+ 4'00" - _Your volition diminishes..._ Sent mods are buffed. Additionally, the surge divider is now 5.5.
+ 4'30" - _Fighting is becoming a heavy task..._ Everything is stronger.
+ 4'40" - _You can't keep up much longer..._ Quests are harder.
+ 4'50" - _The end is near..._ Say your prayers, because...
+ 5'00" - **_YOUR FINAL MOMENTS ARE UPON YOU._** Everything that happens is in the spoiler below. Good luck.
<details>
<summary>
(SPOILER) What exactly happens after 5 minutes?
</summary>
---

\- Surge divider is **4**.

\- **B2B Chaining** is active. You gain additional damage multipliers after reaching certain b2b thresholds (same as tetrio's).

\- **Mods are buffed one last time.** Base mods have their reverse effects instead.

\- **Cursor speed is decreased** over time (linearly to 62% over the next minute).

\- **Keyboard is disabled.** Instead, you gain a damage multiplier based on the current tier.
</details>

## Mechanics
### Mods
Each mod changes the gameplay a bit, and can be combined for high difficulty. Mod tiers are as follows:

- Normal
- Reverse
- Ultra

The 9 base mods are fully combinable with any amount of normals and reverses totaling up to 9. Only one tier can be applied per mod and, when applicable, ultra mods replace reverse mods. Here are some examples of possible and impossible combinations:

Possible: NH rAS, EX MS VL DH, rGV rAS, uEX NH MS GV VL DH IN AS DP

Impossible: EX NH rNH AS (cannot have two tiers of the same mod), uEX rAS DP (if ultra is available, reverse cannot be applied)

\-

With combos out of the way, here's what each mod actually does:

+ EX: Cards a bit closer together, deselected after any commit, and are selected on the end of an input. If AS is active, the keybinds won't show.
    - rEX: **Everything EX does** + cards are closer together and passing a quest with DP doesn't give extra attack.
    - uEX: **Everything rEX does** + super close cards.
+ NH: You can't deselect cards by clicking/typing them. Don't worry, there are other ways.
    - rNH: Perfectly passing doesn't give bonus attack, the queue after the current quest (2 if any DP is active) is hidden, and cards remain selected after passing. **This does NOT apply the NH effect.** Additionally, quests become harder on average but have a high chance to share mods with the previous quest.
    - uNH: **Everything rNH does** + _zero attack from surge_.
+ MS: The cards are lightly shuffled and do so again occasionally.
    - rMS: The cards are more heavily shuffled on occasion and some swap positions after every pass.
    - uMS: The cards are fully shuffled after every pass and even more heavily on occasion.
+ GV: An extra timer is added, when it reaches 0 it commits your current selection by force. It starts out pretty slow and gets faster but it can be reset several times per quest with SPIN/RESET and waits a bit if you don't select anything.
    - rGV: The timer is now noticeably faster and can be reset fewer times per quest.
    - uGV: The timer is now even faster and unforgiving (no grace/resets).
+ VL: The cards are spaced slightly further apart, but each one takes two inputs to select.
    - rVL: The cards are even further apart, but take four inputs to select and deselect.
    - uVL: The cards are super far apart and selecting, deselecting, and committing all take four inputs each.
+ DH: The quests are slightly harder and individual requested mods often appear out of order.
    + rDH: **Everything DH does** + most combos with up to 4 mods and some with 5 are named. Average quest difficulty is lowered unless r/uNH is active.
    + uDH: **Everything rDH does** + quests appear scrambled with the first and last letter being the same. 
+ IN: Cards are flipped to their backs by default and spin horizontally when selected. Additionally, quests aren't colored and hints appear less often.
    - rIN: **Everything IN does** except card spinning and hints. Additionally, quests fade (faster over time) but reappear translucent if you submit the wrong combo.
    - uIN: **Everything rIN does** but quests don't reappear. _Be prepared._
+ AS: You can use your keyboard, but cards burn when selected. If you select a burnt card, you are "wounded" with a couple extra card flips that disregard any burns and don't create them. Burns heal over time and with every commit.
    - rAS: **Everything AS does** but wounds don't heal with time or wrong commits, and flip 4 cards each.
    - uAS: **Everything rAS does** but you DIE if you touch a burn. If any DP is active, wounding kills the active player and flips 4 cards. _Be careful~_
+ DP: ~~DP and two different players bwaaa~~ Your HP bar is doubled and split in two. You are only ever either the left side or the right side, and the two are fully independent of each other. Gameplay affects the half that is focused - you can switch halves at any time by flipping the DP card or passing the second quest. If one half's HP reaches 0, only the other half is playable and you can do a (set of) prompts to revive the other half to max HP. Additionally, once the DP time runs out, average the two sides' health and continue as one.
    - rDP: **Everything DP does** + when you send attack to the opponent, it also affects the inactive side of your HP bar. _You can kill the inactive side if you send too much attack without switching. Be careful._ Additionally, when reviving, this attack still goes to you. _You can forcefully lose the round like this._
    - uDP: **Everything rDP does** + switching sides by flipping the DP card is disabled, and attack affects the inactive side much more.

### Attack / Garbage
If you've played TL before, you know that sent lines aren't immediately received - instead, they appear on the opponent's side with a slight delay inside of a sort of holding area ("garbage queue" if you want), which is emptied and taken by the opponent if they don't try to cancel the damage. The same is true for CL: each passed quest will do its damage only after it's been placed in the opponent's holding area and the opponent doesn't cancel it within the next input.

That's not all though. Remember the mod sending? This works the exact same as normal attacks in that mods will also be sent as a form of "garbage" and can be cancelled by sending the same mods back. Mod garbage is its own thing and, no matter how hard you try, cannot be cancelled with normal attacks. The same is true in the other direction: mods can't do anything to stop normal attacks from lowering your HP.