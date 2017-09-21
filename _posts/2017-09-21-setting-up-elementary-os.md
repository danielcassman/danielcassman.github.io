---
title: Setting Up Elementary OS
author: Daniel Cassman
date: 2017-09-21 11:00:01
categories: [technology]
---

Just a few days ago, I wrote about [setting up my GNOME desktop on Linux]({{ site.baseurl }}{% post_url 2017-09-18-making-gnome-look-good %}). Unfortunately, the current state of play in the GNOME world is that it's just really hard to make the desktop look _polished_. While there are a lot of themes that look nice, I've found a minor issues with almost all of them. I just couldn't settle on a combination that satisfied me. That may change when Ubuntu adopts GNOME as its default desktop environment; Ubuntu is one of the most-used Linux distros, and it has an active community that creates a lot of great stuff. For now, though, I've decided to try [Elementary OS](https://elementary.io/) for a while.

<div class="image centered">
  <img src="{{ "/assets/images/elementary-os.png" | relative_url }}" title="Elementary OS Desktop">
</div>

I've been a fan of Elementary ever since it was a scattered collection of interface elements&mdash;including an icon pack and some various apps&mdash;on DeviantArt. Since then, it's become a well-supported Linux distribution based on Ubuntu. If you want a Linux desktop that looks polished, Elementary is definitely your best option. Its developers spend an incredible amount of time and effort crafting every part of the user interface. A few years ago, I tried the previous version of Elementary OS, called "Freya." It looked nice, but it had a few major problems on my system (likely related to the fact that it was based on an old version of Ubuntu). Elementary 0.4 "Loki" was released last year, and it's a big improvement on Freya. I downloaded it, flashed it to a USB stick, and installed it on my Lenovo Thinkpad T450s laptop. I'm not going to cover the basics of using Elementary here; if you want to learn more, feel free to peruse [Elementary's getting started guide](https://elementary.io/docs/learning-the-basics#learning-the-basics).

Software
--------
Elementary comes with a basic set of applications, many of them created or modified significantly by the Elementary team. These include email, calendar, music, videos, and photos.  The default web browser is the now-obsolete Epiphany. I suppose it would be possible to get by with just the apps installed by default on Elementary, but you'd have a very limited system.

Loki includes AppCenter, an application store that includes a bunch of apps designed specifically for Elementary, as well as many other Linux applications. It's a good start, but I wanted more powerful software tools. Fortunately, since Elementary is based on Ubuntu (which in turn is based on Debian and inherits Debian's [**APT**](https://wiki.debian.org/Apt) package management system), it's easy to install pretty much any software that will run on Linux. For more finely tuned package and repository management, I installed the Synaptic package manager:

```
$ sudo apt install synaptic
```

If you're going to be installing .deb prebuilt packagages&mdash;Debian's equivalent of a Windows .exe or .msi installer&mdash;it's important to note that Elementary doesn't include a graphical Debian package manager. So if you download a .deb file and try to launch it from the graphical file manager, you won't be able to open it. You could always use the command line, like so:

```
$ sudo dpkg -i [path/to/your/package.deb]
```

You could also install the basic .deb package installer, [**gdebi**](https://launchpad.net/gdebi). But Elementary has its own package manager, [**Eddy**](https://github.com/donadigo/eddy), which essentially duplicates the functionality of gdebi in an interface that fits perfectly with Elementary's design.

If you want to modify the applicaitons that appear in the Elementary applications menu, or change the commands used to launch them, you'll want the **AppEditor** app. It's a graphical interface, specifically designed for Elementary, that lets you add, remove, and modify applications from the applicaiton menu. Install it from the AppCenter.

Finally, there are two more tools that are important to install. The first is the software-properties-common package, which provides support for the all-important **add-apt-repository** command line function. The second is **gksu**, a graphical superuser interface that allows you to launch graphical applications with administrator privileges. Both are in the default Ubuntu repositories, so installing them is as easy as:

```
$ sudo apt install software-properties-common gksu
```

Visual Tweaks
-------------
Elementary isn't designed to be highly modifiable or customizable. Its developers carefully craft the interface, and you aren't really supposed to mess with it. But some of us still like to change things that aren't exposed in the OS's default settings. The first tool I use to do that is GNOME Tweak Tools:

```
$ sudo apt install gnome-tweak-tools
```

Even though Elementary uses its own Pantheon desktop environment instead of GNOME, GNOME Tweak Tools still exposes a couple of options that you can't change by default through the Elementary settings app. I also install the [Elementary Tweaks](https://github.com/elementary-tweaks/elementary-tweaks):

```
$ sudo add-apt-repository ppa:philip.scott/elementary-tweaks
$ sudo apt update
$ sudo apt-get install elementary-tweaks
```

Note that Elementary Tweaks isn't a standalone application. Instead, a "Tweaks" icon will appear in the Elementary settings application. That confused me for a while.

Finally, I love the [Moka icon pack](https://snwh.org/moka). It's beautiful, and, unlike a lot of the icon packs out there, it mostly supports Elementary. You can install Moka by adding the repository like so:

```
$ sudo add-apt-repository ppa:moka/daily
$ sudo apt-get update
$ sudo apt-get install moka-icon-theme faba-icon-theme faba-mono-icons
```

Then you can set the icon theme either through the GNOME Tweak Tool or Elementary Tweaks.

System Tools
------------
For a variety of personal reasons,  I still run Windows on my computer and dual boot it with my favorite Linux distro of the moment. As a result, most of my files are stored on an NTFS-formatted partition of my hard drive. That means I need read/write access to my NTFS partitions. It's easy enough to set that up by modifying the [/etc/fstab](https://help.ubuntu.com/community/Fstab) file, but if you want a GUI, you can install **ntfs-config** from the Ubuntu repositories:

```
$ sudo apt install ntfs-config
```

There are a couple of other basic system tools I like to have on hand. First, **powertop** monitors battery usage and helps you tweak system settings to make Linux run in a more battery-friendly manner. Second, **localepurge** removes unnecessary foreign language support from your applications, saving you some disk space. Both are available in the default repositories:

```
$ sudo apt install localepurge powertop
```

I also like to tweak the color profile of my screen so that it's the best match for my hardware. You can pick a color profile by opening the Settings App and navigating to. I like the color profile [available at the Lenovo Forums](https://forums.lenovo.com/t5/ThinkPad-T400-T500-and-newer-T/Color-Profile-for-ThinkPad-T450s-Full-HD-w-o-touch/td-p/2150553) for my laptop.

Last, Elementary doesn't come with a system monitor. Fortunately the **Monitor** app, available in the AppCenter, is a basic system monitor designed specifically for Elementary.

Web Browsers
------------
The Epiphany web browser that comes with Elementary isn't great. It's severely limited in terms of features, so you'll definitely want something more powerful. Chromium and Firefox are both available in the repositories:

```
$ sudo apt install firefox chromium-browser
```

My favorite browser for everyday use, though, is [Vivaldi](https://vivaldi.com). You can install it from its official Ubuntu repository by following the instructions [here](https://www.linuxbabe.com/ubuntu/install-vivaldi-1-2-ubuntu-16-04-via-official-apt-repository).

I also install [Enpass](https://www.enpass.io), my favorite password manager. It has extensions available for [Chrome/Vivaldi](https://chrome.google.com/webstore/detail/enpass-password-manager/kmcfomidfpdkfieipokbalgegidffkal) and Firefox. I also always install [&mu;Block Origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm).

Other Applications
-----------
There are couple of other applications I always install. These ones are available from the AppCenter: the **GIMP Image Editor**, **VLC Video Player**, **Libre Office**, and the **Lollypop Music Player**.

I also noticed an odd limitation of the default Elementary calendar application, Maya. I like Maya. Its interface and features are quite basic, but it looks nice and provides most of the features you need. I  sync it with my Google calendar, but for some reason, Maya only permits you to sync your primary Google calendar, and I have several calendars I want to sync. The best way to do that is to intall **evolution**, the GNOME equivalent of Microsoft Outlook, from the repositories. I don't need Evolution because I like the Elementary Maya and Mail applications, but Evolution lets you sync all the Google calendars you want. Since Maya pulls from the same calendar database, it'll respect the changes you make through Evolution.

Development
-------
I'm currently maintaining websites that run [Jekyll](https://jekyllrb.com/) and [Wordpress](https://wordpress.org/). That means I need local servers capable of running Ruby and PHP. I use git for versioning, so let's install that first:

```
$ sudo apt install git
```

And then all the tools I need for Jekyll:

```
$ sudo apt install ruby ruby-dev liblza-dev zlib1g-dev nodejs
```

Next, I set up Xampp for Linux. You can download it here: [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html) and install it following the instructions available here: [https://www.apachefriends.org/faq_linux.html](https://www.apachefriends.org/faq_linux.html). Then, I use the AppEditor to add an entry for Xampp, with the following command:

```
gksu /opt/lampp/manager-linux-x64.run
```

My IDE of choice is Atom. You can download a prebuilt Debian package from [https://atom.io/](https://atom.io/) and install it using Eddy.

Dropbox
------
Dropbox is, oddly, one of the more difficult applications to set up on Elementary. It's available in the AppCenter, it seems to install just fine. But when you actually start Dropbox, the icon in the panel is missing; you just a black window with a red circle. If the icon were the only issue, it would be a jarringly ugly element in an otherwise beautiful desktop, but it wouldn't be a dealbreaker. The problem is that the application menu&mdash;the one you see when you click on the panel icon&mdash;is also broken, so the application is essentially unusable.

I was able to rectify the problem by the following the instructions from this [StackExchange thread](https://elementaryos.stackexchange.com/questions/7550/dropbox-icon-missing-in-loki). Basically, instead of just running the **dropbox start** command, you run this one:

```
env XDG_CURRENT_DESKTOP=Unity QT_STYLE_OVERRIDE='' dropbox start
```

I opened Settings and went to Applications>Startup, and I changed the Dropbox startup command accordingly. That seemed to work for a bit, but the Dropbox app seems to occassionally overwrite it with the default Dropbox command. I'm still searching for a solution, and I plan to try using the Elementary Dropbox script [available on GitHub](https://github.com/zant95/elementary-dropbox). I'll update this post once I give it a try.
