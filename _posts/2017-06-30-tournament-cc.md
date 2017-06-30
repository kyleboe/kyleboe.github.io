---
layout: post
title: "Tournament Bracket Code Challenge"
image: 'https://media.giphy.com/media/dDZAjSgm02JS8/giphy.gif'
date: 2017-06-29 09:00:00
tags:
- code-challenge
description: 'Build a Tournament Bracket Generator'
categories:
- Code Challenges
twitter_text: Check out this code challenge!
---

<p class="music-read"><a href="spotify:track:2lNFWUrxuNaQsf5I1pDTPr">Music for reading(Spotify)</a> <a href="https://itun.es/us/QKc10?i=886319566" target="_blank">(or Apple Music)</a></p>

## Premise

For those that don't know me, I am a huge fan of video games. My favorite thing about video games, is the comradery it forges in the kiln of competition. I love getting together with friends to hang out and play games together. So much so, I started organizing small [LAN parties](https://en.wikipedia.org/wiki/LAN_party){:target='_blank'} that grew into [fairly big](http://nhlm.org){:target='_blank'} LAN parties. As the LANs grew, so did a need for management/registration software.

In building our own LAN management web application, the job of building a tournament generator fell to me. It was a task that stretched me as a relatively new developer. I recently went back to refactor the code I had slaved over years ago and thought it would be a decent challenge to pose to other developers.

I proposed this code challenge to the fine folks at the [Vancouver(US) Ruby Meetup](https://www.meetup.com/couve-rb/){:target='_blank'} on June 15, 2017. I will be going over my refactored solution at the [next meetup](https://www.meetup.com/couve-rb/events/240721177/){:target='_blank'} (and updating this post). Below is my challenge to you!

### Goals:
  - [Build a tournament Bracket](#build-a-tournament-bracket)
  - [The Bracket must have structure](#the-bracket-must-have-structure)
  - [Allow for any number of entrants](#allow-for-any-number-of-entrants)
  - [The Bracket must have a winner](#the-bracket-must-have-a-winner)


## Build a Tournament Bracket

At its most basic it should look something like this:

<img src="{{ site.url }}/assets/img/tournament-cc/image5.png" style="width:50%;">

Or more complex:

<img src="{{ site.url }}/assets/img/tournament-cc/image1.png" style="width:75%;">

This type of bracket is a [single-elimination](https://en.wikipedia.org/wiki/Single-elimination_tournament){:target='_blank'} type of tournament. After a team loses once, they are out of the tournament.

## The Bracket Must Have Structure

Teams must advance through the tournament as it is built. You cannot just throw teams randomly into the next round:

Valid Bracket:

<img src="{{ site.url }}/assets/img/tournament-cc/image4.png" style="width:75%;border:3px solid #00FF00">

Invalid Bracket:

<img src="{{ site.url }}/assets/img/tournament-cc/image3.png" style="width:75%;border:3px solid #FF0000">

## Allow for Any Number of Entrants

In the example below, there are only 7 teams. So you have to give a random team a [Bye](https://en.wikipedia.org/wiki/Bye_(sports)){:target='_blank'} in the first round.

<img src="{{ site.url }}/assets/img/tournament-cc/image2.png" style="width:75%">

## The Bracket Must Have A Winner

There must be a way of advancing teams through the bracket to determine a winner.

<img src="{{ site.url }}/assets/img/tournament-cc/image4.png" style="width:75%">

#### GLHF!

