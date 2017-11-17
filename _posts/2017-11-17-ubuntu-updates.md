---
layout: post
title: Ubuntu Updates
categories: [technology]
date: 2017-11-17 07:12:39
tags: [technology, ubuntu, linux]
---

As I've continued to use Ubuntu as my [Linux distro of choice on my XPS 15]({{ site.baseurl }}{% post_url 2017-11-02-ubuntu-xps-15 %}), I've made some modifications to my setup. I'm describing some of them here.

Aesthetics
----------
There are a couple of new aesthetic options that I really like. These include the [Adapta GTK and GNOME 3 theme](https://github.com/adapta-project/adapta-gtk-theme) and the [Papirus](https://github.com/PapirusDevelopmentTeam/papirus-icon-theme) and Numix Circle icon themes. These can both be installed from PPAs:

```
$ sudo add-apt-repository ppa:papirus/papirus
$ sudo add-apt-repository ppa:tista/adapta
$ sudo add-apt-repository ppa:numix/ppa
$ sudo apt update
$ sudo apt install papirus-icon-theme adapta-gtk-theme numix-icon-theme-circle
```

I also really like the Obsidian icon theme and Obsidian 2 GTK theme. These can both be installed from the zip packages available on their respective Github pages: the [icons are here](https://github.com/madmaxms/iconpack-obsidian), and the [GTK theme is here](https://github.com/madmaxms/theme-obsidian-2). There's also the [Pocillo icon theme](https://github.com/UbuntuBudgie/pocillo) from Budgie (more on Budgie below).

IBM recently released a new [open source font called Plex](https://ibm.github.io/type/). It looks great as Ubuntu's default font. You can find a .zip download on [Plex's Github page](https://github.com/IBM/type/). Just download it, unzip, and move the desired font files to your **~/.fonts** folder.

New Applications
----------------
I've also discovered a number of great new applications that I hadn't found when I wrote my last post. First is [Mailspring](http://getmailspring.com/), a cool new Linux email client forked from the Nylas project. You can download a .deb packagae on the [Mailspring download page](http://getmailspring.com/download). [OMGUbuntu also has some instructions](http://www.omgubuntu.co.uk/2017/11/mailspring-email-snap-app) on making sure Mailspring fits into the customized look of your desktop.

Cozy is a really neat audiobook player for Linux. You can find a .deb package on its [Github page](https://github.com/geigi/cozy/).

I also sometime take notes in Markdown syntax. I also sometimes write blog posts (like this one) in Markdown. For that, I like [Typora](https://typora.io/). Here are the Ubuntu installation instructions:

```
$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys BA300B7755AFCFAE
$ sudo add-apt-repository 'deb http://typora.io linux/'
$ sudo apt-get update
$ sudo apt-get install typora
```

Next up is the [Corebird Twitter client](https://corebird.baedert.org/). It's also easily installed from a repository:

```
$ sudo add-apt-repository ppa:ubuntuhandbook1/corebird
$ sudo apt update && sudo apt install corebird
```

[YakYak](https://github.com/yakyak/yakyak/) is a neat Google Hangouts client for Linux. You can find a .zip file in its [Github releases folder](https://github.com/yakyak/yakyak/releases/). Download the .zip file, extract, and run the binary.

Of course, there's [Slack](https://slack.com/). Slack provides a binary on its [Linux download page](https://slack.com/downloads/linux).

Then there are a couple of alternative terminal applications that are worth exploring. [Guake](https://github.com/Guake/guake) is a drop-down terminal, and [Terminator](https://gnometerminator.blogspot.com/p/introduction.html) is excellent at showing multiple terminal instances in a grid layout. [Tilix](https://github.com/gnunn1/tilix/) is another tiling terminal emulator, and you can get [installation instructions here](https://gnunn1.github.io/tilix-web/#packages).

If you're going to use Ubuntu as your primary operating system, you'll need a way to keep up with the news. [Coffee](https://nick92.github.io/coffee/) is a cool news and weather widget. It's relatively new and still has some issues, but it looks promising.

```
$ sudo add-apt-repository ppa:coffee-team/coffee
$ sudo apt update
$ sudo apt install com.github.nick92.coffee
```

Budgie
------
[Budgie](https://budgie-desktop.org/home/) is a promising new Linux desktop environment based on GNOME. Because Budgie is still under active development, it's nice that you can install Budgie alongside your existing GNOME installation without nuking everything. To give it a whirl, just add the repo and install:

```
$ sudo add-apt-repository ppa:ubuntubudgie/backports
$ sudo apt update
$ sudo apt install budgie-desktop
```

Also check for any additional applets you'd like to install. Then logout, choose the Budgie option, and log back in.
