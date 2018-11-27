---
author: 'joshWood'
categories: rails
date: '2016-03-07'
path: '/blog/upgrade-ruby-on-rails'
summary: "Is your app ready for the latest version of Rails? Follow these steps/best practices to make your upgrade go as smoothly as possible."
title: 'How to Upgrade to Rails 5'
---

Ruby on Rails version 5 is just around the corner, with 5.0.0.beta3 released in
late February. Is your app ready? Follow these steps/best practices to update
your app to the latest version of Rails as smoothly as possible.

## Check your Ruby version

The first thing you'll need to know is the Ruby version your app currently
supports. If you're on an old version, then you may need to upgrade Ruby before
you upgrade Rails. Rails 5 requires Ruby 2.2.2 or newer. We recommend upgrading
to 2.3.0, which is the latest version of Ruby.

## Check your Rails version

The [current stable version](https://rubygems.org/gems/rails/versions) of Ruby
on Rails is Rails 4.2.5. If you're on an earlier version, you should upgrade to
4.2.5 **before** attempting to upgrade to version 5.0.0. To avoid some serious
headaches, it's best to upgrade in increments; for example, from 4.1.5 to
4.1.15, 4.1.15 to 4.2.5 and finally from 4.2.5 to 5.0.0. Otherwise you
will lose valuable deprecation warnings and be stumped when things just stop
working for no apparent reason.

## Use your test suite

A solid automated test suite is invaluable when performing an upgrade; tests
ensure that your app executes the same way after the upgrade as it did before.
If the test coverage (the amount of code that gets executed when your tests run)
for your app is high, then many bugs and inconsistencies created by the upgrade
process will be discovered up front rather than waiting for your users to
encounter them (if you don't write tests, make sure you use
[Honeybadger](https://www.honeybadger.io/) :)).

**PROTIP: Write some tests before an upgrade if you don't have a test suite, or
if your test coverage is low.**

## Review your dependencies

Many surprises may be lurking in your Gemfile. When you go to update the `rails`
gem, for instance, you may realize that the `rspec-rails` gem must also be
updated. But wait, the latest version of RSpec has new syntax, and before long
you find yourself rewriting your test suite. That's what we call [shaving a
yak](http://sethgodin.typepad.com/seths_blog/2005/03/dont_shave_that.html), and
we prefer not to do it; or at least we like to know about it ahead of time. Take
a look at your gems before starting the upgrade and see if you can identify some
yaks; your future (less surprised) self will thank you.

## Pick your battles

Speaking of yak shaving, it's easy to get tangled up in making changes to your
application code when Rails changes a core feature. Avoid changing your code as
much as possible until after you're successfully running the new version of
Rails. This will reduce the number of bugs you have to deal with immediately. In
some cases Rails makes this easy by providing backwards-compatibility for a
deprecated feature via adding a gem.

A great example of this is [strong
parameters](http://edgeguides.rubyonrails.org/action_controller_overview.html#strong-parameters).
Prior to version 4, Rails had a feature called "protected attributes" which
protected model attributes from mass assignment exploits. In version 4 this
feature was replaced by a new approach called "strong parameters". Upgrading
from protected attributes to strong parameters is a project in itself; one which
can involve changing a lot of model, controller and test code, and in turn makes
it easier to introduce new bugs.

The good news is that the Rails team [released a
gem](https://github.com/rails/protected_attributes) which allows you to continue
to use protected attributes on Rails 4, without migrating to strong parameters
immediately. Using this gem means changing a single line of code vs.
potentially hundreds. After you've completed the upgrade, plan a followup
project to migrate to new features provided by your new Rails version.

## Preserve history

You'll still be making a lot of random changes to your app during the upgrade
process as you update syntax and refactor deprecated code; it's super easy to
get in the zone, get things working/tests passing/whatever and then save the
changes in a massive commit. *Avoid doing this*.

Instead, try to make small, isolated changes and commit them as you work;
clearly explain your thinking in your commit messages so that you'll remember
your reasoning when you (and/or your team members) look back on the upgrade 6
months or a year from now.

## Follow the instructions

The Rails team has provided an excellent [Guide for Upgrading Ruby on
Rails](http://edgeguides.rubyonrails.org/upgrading_ruby_on_rails.html) that we
would be hard-pressed to beat. Follow the official instructions, and be sure to
read the General Advice section for even more great tips.

Now it's time to get to work. If you would like some help upgrading your Rails
app (or if you would rather ship features instead), be sure to check out
[UpgradeRails.com](http://www.upgraderails.com/?utm_source=hint&utm_medium=link&utm_campaign=HowToUpgradeRails),
our concierge Rails upgrade
service. We'll manage the process of upgrading to the latest version of Rails
from start to finish and also schedule regular upgrades as they are released.

In any case, let us know how it goes! Feel free to email us your advice,
questions, or feedback.

## Further reading

- [The official Rails upgrade
  guide](http://edgeguides.rubyonrails.org/upgrading_ruby_on_rails.html)
- [The official Rails maintenance
  policy](http://guides.rubyonrails.org/maintenance_policy.html)
- [Support plans for Ruby 2.0 and Ruby
  2.1](https://www.ruby-lang.org/en/news/2016/02/24/support-plan)