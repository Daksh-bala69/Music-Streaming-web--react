BEGIN;

WITH import_data (
  track_number,
  song_title,
  artist_name,
  album_title,
  release_year,
  genre_name,
  album_folder,
  audio_filename,
  cover_filename,
  duration_seconds
) AS (
  VALUES
    (1, 'Wake Up Mr. West', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '01. Wake Up Mr. West.flac', 'cover.jpg', 41),
    (2, 'Heard ''Em Say (ft. Adam Levine)', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '02. Heard ''Em Say (ft. Adam Levine).flac', 'cover.jpg', 204),
    (3, 'Touch the Sky (ft. Lupe Fiasco)', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '03. Touch the Sky (ft. Lupe Fiasco).flac', 'cover.jpg', 237),
    (4, 'Gold Digger (ft. Jamie Foxx)', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '04. Gold Digger (ft. Jamie Foxx).flac', 'cover.jpg', 208),
    (5, 'Skit #1', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '05. Skit #1.flac', 'cover.jpg', 34),
    (6, 'Drive Slow (ft. Paul Wall & GLC)', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '06. Drive Slow (ft. Paul Wall & GLC).flac', 'cover.jpg', 273),
    (7, 'My Way Home', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '07. My Way Home.flac', 'cover.jpg', 104),
    (8, 'Crack Music (ft. The Game)', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '08. Crack Music (ft. The Game).flac', 'cover.jpg', 271),
    (9, 'Roses', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '09. Roses.flac', 'cover.jpg', 246),
    (10, 'Bring Me Down (ft. Brandy)', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '10. Bring Me Down (ft. Brandy).flac', 'cover.jpg', 199),
    (11, 'Addiction', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '11. Addiction.flac', 'cover.jpg', 267),
    (12, 'Skit #2', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '12. Skit #2.flac', 'cover.jpg', 31),
    (13, 'Diamonds from Sierra Leone (Remix) [ft. Jay-Z]', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '13. Diamonds from Sierra Leone (Remix) [ft. Jay-Z].flac', 'cover.jpg', 233),
    (14, 'We Major (ft. Nas & Really Doe)', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '14. We Major (ft. Nas & Really Doe).flac', 'cover.jpg', 449),
    (15, 'Skit #3', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '15. Skit #3.flac', 'cover.jpg', 24),
    (16, 'Hey Mama', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '16. Hey Mama.flac', 'cover.jpg', 305),
    (17, 'Celebration', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '17. Celebration.flac', 'cover.jpg', 198),
    (18, 'Skit #4', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '18. Skit #4.flac', 'cover.jpg', 79),
    (19, 'Gone (ft. Consequence & Cam''ron)', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '19. Gone (ft. Consequence & Cam''ron).flac', 'cover.jpg', 363),
    (20, 'Diamonds from Sierra Leone', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '20. Diamonds from Sierra Leone.flac', 'cover.jpg', 239),
    (21, 'Back to Basics (ft. Common)', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '21. Back to Basics (ft. Common).flac', 'cover.jpg', 99),
    (22, 'We Can Make It Better', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '22. We Can Make It Better.flac', 'cover.jpg', 232),
    (23, 'Late', 'Kanye West', 'Late Registration', 2005, 'Hip-Hop', '2005.08 - Late Registration (Australian Tour Edition) [AU - 9853447]', '23. Late.flac', 'cover.jpg', 230),
    (1, 'Good Morning', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '01 - Good Morning.flac', 'cover.jpg', 195),
    (2, 'Champion', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '02 - Champion.flac', 'cover.jpg', 168),
    (3, 'Stronger', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '03 - Stronger.flac', 'cover.jpg', 312),
    (4, 'I Wonder', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '04 - I Wonder.flac', 'cover.jpg', 243),
    (5, 'Good Life', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '05 - Good Life.flac', 'cover.jpg', 207),
    (6, 'Can’t Tell Me Nothing', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '06 - Can’t Tell Me Nothing.flac', 'cover.jpg', 272),
    (7, 'Barry Bonds', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '07 - Barry Bonds.flac', 'cover.jpg', 204),
    (8, 'Drunk and Hot Girls', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '08 - Drunk and Hot Girls.flac', 'cover.jpg', 313),
    (9, 'Flashing Lights', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '09 - Flashing Lights.flac', 'cover.jpg', 238),
    (10, 'Everything I Am', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '10 - Everything I Am.flac', 'cover.jpg', 228),
    (11, 'The Glory', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '11 - The Glory.flac', 'cover.jpg', 213),
    (12, 'Homecoming', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '12 - Homecoming.flac', 'cover.jpg', 203),
    (13, 'Big Brother', 'Kanye West', 'Graduation', 2007, 'Hip-Hop', '2007 - Graduation', '13 - Big Brother.flac', 'cover.jpg', 288),
    (1, 'Dark Fantasy', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '01 - Dark Fantasy.flac', 'cover.jpg', 281),
    (2, 'Gorgeous', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '02 - Gorgeous.flac', 'cover.jpg', 358),
    (3, 'POWER', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '03 - POWER.flac', 'cover.jpg', 292),
    (4, 'All Of The Lights (Interlude)', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '04 - All Of The Lights (Interlude).flac', 'cover.jpg', 62),
    (5, 'All Of The Lights', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '05 - All Of The Lights.flac', 'cover.jpg', 300),
    (6, 'Monster', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '06 - Monster.flac', 'cover.jpg', 379),
    (7, 'So Appalled', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '07 - So Appalled.flac', 'cover.jpg', 398),
    (8, 'Devil In A New Dress', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '08 - Devil In A New Dress.flac', 'cover.jpg', 352),
    (9, 'Runaway', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '09 - Runaway.flac', 'cover.jpg', 548),
    (10, 'Hell of a Life', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '10 - Hell of a Life.flac', 'cover.jpg', 328),
    (11, 'Blame Game', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '11 - Blame Game.flac', 'cover.jpg', 470),
    (12, 'Lost in the World', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '12 - Lost in the World.flac', 'cover.jpg', 257),
    (13, 'Who Will Survive In America', 'Kanye West', 'My Beautiful Dark Twisted Fantasy', 2010, 'Hip-Hop', '2010 - My Beautiful Dark Twisted Fantasy [Qobuz~] [16 bit - 44.1kHz]', '13 - Who Will Survive In America.flac', 'cover.jpg', 98),
    (1, 'Let It Happen', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '01 Let It Happen.flac', 'cover.jpg', 467),
    (2, 'Nangs', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '02 Nangs.flac', 'cover.jpg', 108),
    (3, 'The Moment', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '03 The Moment.flac', 'cover.jpg', 255),
    (4, 'Yes I''m Changing', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '04 Yes I''m Changing.flac', 'cover.jpg', 271),
    (5, 'Eventually', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '05 Eventually.flac', 'cover.jpg', 319),
    (6, 'Gossip', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '06 Gossip.flac', 'cover.jpg', 55),
    (7, 'The Less I Know the Better', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '07 The Less I Know the Better.flac', 'cover.jpg', 219),
    (8, 'Past Life', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '08 Past Life.flac', 'cover.jpg', 228),
    (9, 'Disciples', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '09 Disciples.flac', 'cover.jpg', 108),
    (10, '''Cause I''m a Man', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '10 ''Cause I''m a Man.flac', 'cover.jpg', 242),
    (11, 'Reality in Motion', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '11 Reality in Motion.flac', 'cover.jpg', 253),
    (12, 'Love_Paranoia', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '12 Love_Paranoia.flac', 'cover.jpg', 186),
    (13, 'New Person, Same Old Mistakes', 'Tame Impala', 'Currents', 2015, 'Psychedelic Rock', '2015 - Currents', '13 New Person, Same Old Mistakes.flac', 'cover.jpg', 362),
    (1, 'Wake', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '01 - Wake.flac', 'cover.jpg', 101),
    (2, 'Given Up', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '02 - Given Up.flac', 'cover.jpg', 189),
    (3, 'Leave Out All The Rest', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '03 - Leave Out All The Rest.flac', 'cover.jpg', 209),
    (4, 'Bleed It Out', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '04 - Bleed It Out.flac', 'cover.jpg', 164),
    (5, 'Shadow of the Day', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '05 - Shadow of the Day.flac', 'cover.jpg', 290),
    (6, 'What I''ve Done', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '06 - What I''ve Done.flac', 'cover.jpg', 205),
    (7, 'Hands Held High', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '07 - Hands Held High.flac', 'cover.jpg', 233),
    (8, 'No More Sorrow', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '08 - No More Sorrow.flac', 'cover.jpg', 222),
    (9, 'Valentine''s Day', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '09 - Valentine''s Day.flac', 'cover.jpg', 197),
    (10, 'In Between', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '10 - In Between.flac', 'cover.jpg', 197),
    (11, 'In Pieces', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '11 - In Pieces.flac', 'cover.jpg', 218),
    (12, 'The Little Things Give You Away', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '12 - The Little Things Give You Away.flac', 'cover.jpg', 384),
    (13, 'No Roads Left', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '13 - No Roads Left.flac', 'cover.jpg', 229),
    (14, 'Across the Line', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '14 - Across the Line.flac', 'cover.jpg', 190),
    (15, 'Given Up (Third Encore Sessions)', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '15 - Given Up (Third Encore Sessions).flac', 'cover.jpg', 189),
    (16, 'What I''ve Done (Distorted Remix)', 'Linkin Park', 'Minutes to Midnight', 2007, 'Alternative Rock', '2022 - Minutes to Midnight', '16 - What I''ve Done (Distorted Remix).flac', 'cover.jpg', 228),
    (1, 'A Quick One Before The Eternal Worm Devours Connecticut', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '1 - A Quick One Before The Eternal Worm Devours Connecticut.flac', 'cover.jpg', 473),
    (1, 'Waiting For Black Metal Records To Come In The Mail', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '1 - Waiting For Black Metal Records To Come In The Mail.flac', 'cover.jpg', 377),
    (2, 'Bloodhail', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '2 - Bloodhail.flac', 'cover.jpg', 340),
    (2, 'Holy Fucking Shit  40,000', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '2 - Holy Fucking Shit  40,000.flac', 'cover.jpg', 389),
    (3, 'The Big Gloom', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '3 - The Big Gloom.flac', 'cover.jpg', 486),
    (3, 'The Future', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '3 - The Future.flac', 'cover.jpg', 326),
    (4, 'Deep, Deep', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '4 - Deep, Deep.flac', 'cover.jpg', 230),
    (4, 'Hunter', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '4 - Hunter.flac', 'cover.jpg', 585),
    (5, 'I Don''t Love', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '5 - I Don''t Love.flac', 'cover.jpg', 373),
    (5, 'Telephony', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '5 - Telephony.flac', 'cover.jpg', 278),
    (6, 'Earthmover', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '6 - Earthmover.flac', 'cover.jpg', 688),
    (6, 'Who Would Leave Their Son Out In The Sun', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '6 - Who Would Leave Their Son Out In The Sun .flac', 'cover.jpg', 319),
    (7, 'There Is No Food', 'Have a Nice Life', 'Deathconsciousness', 2008, 'Shoegaze', 'Have a Nice Life - Deathconciousness', '7 - There Is No Food.flac', 'cover.jpg', 240),
    (1, 'Foreword', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 01 - Foreword.flac', 'cover.jpg', 13),
    (2, 'Don’t Stay', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 02 - Don’t Stay.flac', 'cover.jpg', 188),
    (3, 'Somewhere I Belong', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 03 - Somewhere I Belong.flac', 'cover.jpg', 214),
    (4, 'Lying From You', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 04 - Lying From You.flac', 'cover.jpg', 175),
    (5, 'Hit the Floor', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 05 - Hit the Floor.flac', 'cover.jpg', 164),
    (6, 'Easier to Run', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 06 - Easier to Run.flac', 'cover.jpg', 204),
    (7, 'Faint', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 07 - Faint.flac', 'cover.jpg', 162),
    (8, 'Figure.09', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 08 - Figure.09.flac', 'cover.jpg', 198),
    (9, 'Breaking the Habit', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 09 - Breaking the Habit.flac', 'cover.jpg', 196),
    (10, 'From the Inside', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 10 - From the Inside.flac', 'cover.jpg', 176),
    (11, 'Nobody’s Listening', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 11 - Nobody’s Listening.flac', 'cover.jpg', 179),
    (12, 'Session', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 12 - Session.flac', 'cover.jpg', 145),
    (13, 'Numb', 'Linkin Park', 'Meteora', 2003, 'Nu Metal', 'Meteora (2003)', 'Linkin Park - Meteora - 13 - Numb.flac', 'cover.jpg', 188),
    (1, 'Massive Attack - Angel', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '01. Massive Attack - Angel.flac', 'cover.jpg', 381),
    (2, 'Massive Attack - Risingson', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '02. Massive Attack - Risingson.flac', 'cover.jpg', 299),
    (3, 'Massive Attack - Teardrop', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '03. Massive Attack - Teardrop.flac', 'cover.jpg', 331),
    (4, 'Massive Attack - Inertia Creeps', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '04. Massive Attack - Inertia Creeps.flac', 'cover.jpg', 357),
    (5, 'Massive Attack - Exchange', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '05. Massive Attack - Exchange.flac', 'cover.jpg', 251),
    (6, 'Massive Attack - Dissolved Girl', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '06. Massive Attack - Dissolved Girl.flac', 'cover.jpg', 367),
    (7, 'Massive Attack - Man Next Door', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '07. Massive Attack - Man Next Door.flac', 'cover.jpg', 356),
    (8, 'Massive Attack - Black Milk', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '08. Massive Attack - Black Milk.flac', 'cover.jpg', 382),
    (9, 'Massive Attack - Mezzanine', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '09. Massive Attack - Mezzanine.flac', 'cover.jpg', 357),
    (10, 'Massive Attack - Group Four', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '10. Massive Attack - Group Four.flac', 'cover.jpg', 492),
    (11, 'Massive Attack - (Exchange)', 'Massive Attack', 'Mezzanine', 1998, 'Trip-Hop', 'Mezzanine', '11. Massive Attack - (Exchange).flac', 'cover.jpg', 250),
    (1, 'Smells Like Teen Spirit', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '01 Smells Like Teen Spirit.flac', 'cover.jpg', 301),
    (2, 'In Bloom', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '02 In Bloom.flac', 'cover.jpg', 255),
    (3, 'Come as You Are', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '03 Come as You Are.flac', 'cover.jpg', 219),
    (4, 'Breed', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '04 Breed.flac', 'cover.jpg', 184),
    (5, 'Lithium', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '05 Lithium.flac', 'cover.jpg', 257),
    (6, 'Polly', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '06 Polly.flac', 'cover.jpg', 175),
    (7, 'Territorial Pissings', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '07 Territorial Pissings.flac', 'cover.jpg', 144),
    (8, 'Drain You', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '08 Drain You.flac', 'cover.jpg', 223),
    (9, 'Lounge Act', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '09 Lounge Act.flac', 'cover.jpg', 157),
    (10, 'Stay Away', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '10 Stay Away.flac', 'cover.jpg', 212),
    (11, 'On a Plain', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '11 On a Plain.flac', 'cover.jpg', 197),
    (12, 'Something in the Way _ Endless, Nameless', 'Nirvana', 'Nevermind', 1991, 'Grunge', 'Nevermind', '12 Something in the Way _ Endless, Nameless.flac', 'cover.jpg', 232),
    (1, 'Pornography', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '01 Pornography.flac', 'cover.jpg', 232),
    (2, 'Oh My Dis Side (feat. Quavo)', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '02 Oh My Dis Side (feat. Quavo).flac', 'cover.jpg', 351),
    (3, '3500 (feat. Future & 2 Chainz)', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '03 3500 (feat. Future & 2 Chainz).flac', 'cover.jpg', 462),
    (4, 'Wasted (feat. Juicy J)', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '04 Wasted (feat. Juicy J).flac', 'cover.jpg', 236),
    (5, '90210', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '05 90210.flac', 'cover.jpg', 339),
    (6, 'Pray 4 Love (feat. The Weeknd)', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '06 Pray 4 Love (feat. The Weeknd).flac', 'cover.jpg', 307),
    (7, 'Nightcrawler (feat. Swae Lee & Chief Keef)', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '07 Nightcrawler (feat. Swae Lee & Chief Keef).flac', 'cover.jpg', 322),
    (8, 'Piss On Your Grave (feat. Kanye West)', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '08 Piss On Your Grave (feat. Kanye West).flac', 'cover.jpg', 166),
    (9, 'Antidote', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '09 Antidote.flac', 'cover.jpg', 263),
    (10, 'Impossible', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '10 Impossible.flac', 'cover.jpg', 243),
    (11, 'Maria I''m Drunk (feat. Justin Bieber & Young Thug)', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '11 Maria I''m Drunk (feat. Justin Bieber & Young Thug).flac', 'cover.jpg', 350),
    (12, 'Flying High (feat. Toro y Moi)', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '12 Flying High (feat. Toro y Moi).flac', 'cover.jpg', 209),
    (13, 'I Can Tell', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '13 I Can Tell.flac', 'cover.jpg', 236),
    (14, 'Apple Pie', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '14 Apple Pie.flac', 'cover.jpg', 219),
    (15, 'Ok Alright (feat. ScHoolboy Q)', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '15 Ok Alright (feat. ScHoolboy Q).flac', 'cover.jpg', 418),
    (16, 'Never Catch Me', 'Travis Scott', 'Rodeo', 2015, 'Hip-Hop', 'Rodeo', '16 Never Catch Me.flac', 'cover.jpg', 176),
    (1, 'Intro', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '01 Intro.flac', 'cover.jpg', 19),
    (2, 'We Don''t Care', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '02 We Don''t Care.flac', 'cover.jpg', 240),
    (3, 'Graduation Day', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '03 Graduation Day.flac', 'cover.jpg', 82),
    (4, 'All Falls Down', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '04 All Falls Down.flac', 'cover.jpg', 224),
    (5, 'I''ll Fly Away', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '05 I''ll Fly Away.flac', 'cover.jpg', 70),
    (6, 'Spaceship', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '06 Spaceship.flac', 'cover.jpg', 324),
    (7, 'Jesus Walks', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '07 Jesus Walks.flac', 'cover.jpg', 194),
    (8, 'Never Let Me Down', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '08 Never Let Me Down.flac', 'cover.jpg', 324),
    (9, 'Get Em High', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '09 Get Em High.flac', 'cover.jpg', 289),
    (10, 'Workout Plan', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '10 Workout Plan.flac', 'cover.jpg', 46),
    (11, 'The New Workout Plan', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '11 The New Workout Plan.flac', 'cover.jpg', 323),
    (12, 'Slow Jamz', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '12 Slow Jamz.flac', 'cover.jpg', 316),
    (13, 'Breathe In Breathe Out', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '13 Breathe In Breathe Out.flac', 'cover.jpg', 247),
    (14, 'School Spirit Skit 1', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '14 School Spirit Skit 1.flac', 'cover.jpg', 79),
    (15, 'School Spirit', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '15 School Spirit.flac', 'cover.jpg', 182),
    (16, 'School Spirit Skit 2', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '16 School Spirit Skit 2.flac', 'cover.jpg', 44),
    (17, 'Lil Jimmy Skit', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '17 Lil Jimmy Skit.flac', 'cover.jpg', 54),
    (18, 'Two Words', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '18 Two Words.flac', 'cover.jpg', 266),
    (19, 'Through the Wire', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '19 Through the Wire.flac', 'cover.jpg', 221),
    (20, 'Family Business', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '20 Family Business.flac', 'cover.jpg', 279),
    (21, 'Last Call', 'Kanye West', 'The College Dropout', 2004, 'Hip-Hop', 'The College Dropout', '21 Last Call.flac', 'cover.jpg', 761),
    (1, 'The Introduction', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '01 - The Introduction.flac', 'cover.jpg', 61),
    (2, 'We Are', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '02 - We Are.flac', 'cover.jpg', 198),
    (3, 'Light Up the Sky', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '03 - Light Up the Sky.flac', 'cover.jpg', 240),
    (4, 'The End Is Where We Begin', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '04 - The End Is Where We Begin.flac', 'cover.jpg', 225),
    (5, 'Let the Sparks Fly', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '05 - Let the Sparks Fly.flac', 'cover.jpg', 246),
    (6, 'I Get Wicked', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '06 - I Get Wicked.flac', 'cover.jpg', 213),
    (7, 'Be Somebody', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '07 - Be Somebody.flac', 'cover.jpg', 222),
    (8, 'This Is a Warning', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '08 - This Is a Warning.flac', 'cover.jpg', 47),
    (9, 'Courtesy Call', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '09 - Courtesy Call.flac', 'cover.jpg', 237),
    (10, 'War of Change', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '10 - War of Change.flac', 'cover.jpg', 232),
    (11, 'Down', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '11 - Down.flac', 'cover.jpg', 207),
    (12, 'All I Need to Know', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '12 - All I Need to Know.flac', 'cover.jpg', 250),
    (13, 'Fly On the Wall', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '13 - Fly On the Wall.flac', 'cover.jpg', 243),
    (14, 'So Far Gone', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '14 - So Far Gone.flac', 'cover.jpg', 269),
    (15, 'Outroduction', 'Thousand Foot Krutch', 'The End Is Where We Begin', 2012, 'Alternative Rock', 'The End Is Where We Begin', '15 - Outroduction.flac', 'cover.jpg', 38),
    (6, 'u', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '06 - u.flac', 'cover.jpg', 268),
    (7, 'Alright', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '07 - Alright.flac', 'cover.jpg', 219),
    (8, 'For Sale_ (interlude)', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '08 - For Sale_ (interlude).flac', 'cover.jpg', 292),
    (9, 'Momma', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '09 - Momma.flac', 'cover.jpg', 283),
    (10, 'Hood Politics', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '10 - Hood Politics.flac', 'cover.jpg', 293),
    (11, 'How Much a Dollar Cost', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '11 - How Much a Dollar Cost.flac', 'cover.jpg', 262),
    (12, 'Complexion (A Zulu Love)', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '12 - Complexion (A Zulu Love).flac', 'cover.jpg', 263),
    (13, 'The Blacker the Berry', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '13 - The Blacker the Berry.flac', 'cover.jpg', 329),
    (14, 'You Ain’t Gotta Lie (Momma Said)', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '14 - You Ain’t Gotta Lie (Momma Said).flac', 'cover.jpg', 242),
    (15, 'i', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '15 - i.flac', 'cover.jpg', 336),
    (16, 'Mortal Man', 'Kendrick Lamar', 'To Pimp a Butterfly', 2015, 'Hip-Hop', 'To Pimp a Butterfly (2015)', '16 - Mortal Man.flac', 'cover.jpg', 727),
    (1, 'First Light', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '1 - First Light.flac', 'cover.jpg', 84),
    (1, 'Let It Die', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '1 - Let It Die.flac', 'cover.jpg', 272),
    (2, 'Down With the Fallen', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '2 - Down With the Fallen.flac', 'cover.jpg', 258),
    (2, 'The Future Is Now', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '2 - The Future Is Now.flac', 'cover.jpg', 286),
    (3, 'Halo', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '3 - Halo.flac', 'cover.jpg', 226),
    (3, 'Point of No Return', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '3 - Point of No Return.flac', 'cover.jpg', 220),
    (4, 'Carnivore', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '4 - Carnivore.flac', 'cover.jpg', 263),
    (4, 'Rise and Fall', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '4 - Rise and Fall.flac', 'cover.jpg', 354),
    (5, 'Telescope', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '5 - Telescope.flac', 'cover.jpg', 331),
    (6, 'It Has Begun', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '6 - It Has Begun.flac', 'cover.jpg', 317),
    (7, 'My Demons', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '7 - My Demons.flac', 'cover.jpg', 288),
    (8, 'Antigravity', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '8 - Antigravity.flac', 'cover.jpg', 369),
    (9, 'Dark on Me', 'Starset', 'Transmissions', 2014, 'Alternative Rock', 'Transmissions', '9 - Dark on Me.flac', 'cover.jpg', 338),
    (1, 'Stargazing', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '01 - Stargazing.flac', 'cover.jpg', 271),
    (2, 'Carousel', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '02 - Carousel.flac', 'cover.jpg', 180),
    (3, 'Sicko Mode', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '03 - Sicko Mode.flac', 'cover.jpg', 313),
    (4, 'R.I.P. Screw', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '04 - R.I.P. Screw.flac', 'cover.jpg', 186),
    (5, 'Stop Trying To Be God', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '05 - Stop Trying To Be God.flac', 'cover.jpg', 338),
    (6, 'No Bystanders', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '06 - No Bystanders.flac', 'cover.jpg', 218),
    (7, 'Skeletons', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '07 - Skeletons.flac', 'cover.jpg', 146),
    (8, 'Wake Up', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '08 - Wake Up.flac', 'cover.jpg', 232),
    (9, '5 Tint', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '09 - 5 Tint.flac', 'cover.jpg', 196),
    (10, 'Nc-17', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '10 - Nc-17.flac', 'cover.jpg', 157),
    (11, 'Astrothunder', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '11 - Astrothunder.flac', 'cover.jpg', 143),
    (12, 'Yosemite', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '12 - Yosemite.flac', 'cover.jpg', 150),
    (13, 'Can''t Say', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '13 - Can''t Say.flac', 'cover.jpg', 198),
    (14, 'Who What!', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '14 - Who What!.flac', 'cover.jpg', 177),
    (15, 'Butterfly Effect', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '15 - Butterfly Effect.flac', 'cover.jpg', 191),
    (16, 'Houstonfornication', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '16 - Houstonfornication.flac', 'cover.jpg', 218),
    (17, 'Coffee Bean', 'Travis Scott', 'Astroworld', 2018, 'Hip-Hop', 'Travis Scott - Astroworld (2018) [WEB FLAC]', '17 - Coffee Bean.flac', 'cover.jpg', 209)
),

all_artists AS (
  INSERT INTO artists (name)
  SELECT DISTINCT artist_name
  FROM import_data
  ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
  RETURNING id, name
),

all_genres AS (
  INSERT INTO genres (name)
  SELECT DISTINCT genre_name
  FROM import_data
  ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
  RETURNING id, name
),

all_albums AS (
  INSERT INTO albums (
    artist_id,
    title,
    cover_filename,
    release_year,
    folder_name
  )
  SELECT DISTINCT
    ar.id,
    d.album_title,
    d.album_folder || '/' || d.cover_filename,
    d.release_year,
    d.album_folder
  FROM import_data d
  JOIN all_artists ar ON ar.name = d.artist_name
  ON CONFLICT (artist_id, title)
  DO UPDATE SET
    cover_filename = EXCLUDED.cover_filename,
    release_year = EXCLUDED.release_year,
    folder_name = EXCLUDED.folder_name
  RETURNING id, artist_id, title
),

all_songs AS (
  INSERT INTO songs (
    title,
    album_id,
    filename,
    cover_filename,
    duration_seconds,
    file_path,
    track_number
  )
  SELECT
    d.song_title,
    al.id,
    d.audio_filename,
    d.album_folder || '/' || d.cover_filename,
    d.duration_seconds,
    d.album_folder || '/' || d.audio_filename,
    d.track_number
  FROM import_data d
  JOIN all_artists ar ON ar.name = d.artist_name
  JOIN all_albums al
    ON al.title = d.album_title
   AND al.artist_id = ar.id
  ON CONFLICT (file_path)
  DO UPDATE SET
    title = EXCLUDED.title,
    album_id = EXCLUDED.album_id,
    filename = EXCLUDED.filename,
    cover_filename = EXCLUDED.cover_filename,
    duration_seconds = EXCLUDED.duration_seconds,
    track_number = EXCLUDED.track_number
  RETURNING id, file_path
),

linked_artists AS (
  INSERT INTO song_artists (song_id, artist_id)
  SELECT
    s.id,
    ar.id
  FROM import_data d
  JOIN all_songs s
    ON s.file_path = d.album_folder || '/' || d.audio_filename
  JOIN all_artists ar
    ON ar.name = d.artist_name
  ON CONFLICT (song_id, artist_id) DO NOTHING
  RETURNING song_id
)

INSERT INTO song_genres (song_id, genre_id)
SELECT
  s.id,
  g.id
FROM import_data d
JOIN all_songs s
  ON s.file_path = d.album_folder || '/' || d.audio_filename
JOIN all_genres g
  ON g.name = d.genre_name
ON CONFLICT (song_id, genre_id) DO NOTHING;

COMMIT;
