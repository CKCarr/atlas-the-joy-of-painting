-- Ensure you are connected to your existing database, mypgdb
-- \c mypgdb

-- Create the colors_used table
CREATE TABLE colors (
    color_id SERIAL PRIMARY KEY,
    painting_index INT,
    img_src VARCHAR(255),
    painting_title VARCHAR(255),
    season INT,
    episode INT,
    num_colors INT,
    youtube_src VARCHAR(255),
    colors VARCHAR[],
    color_hex VARCHAR[],
    black_gesso BOOLEAN,
    bright_red BOOLEAN,
    burnt_umber BOOLEAN,
    cadmium_yellow BOOLEAN,
    dark_sienna BOOLEAN,
    indian_red BOOLEAN,
    indian_yellow BOOLEAN,
    liquid_black BOOLEAN,
    liquid_clear BOOLEAN,
    midnight_black BOOLEAN,
    phthalo_blue BOOLEAN,
    phthalo_green BOOLEAN,
    prussian_blue BOOLEAN,
    sap_green BOOLEAN,
    titanium_white BOOLEAN,
    van_dyke_brown BOOLEAN,
    yellow_ochre BOOLEAN,
    alizarin_crimson BOOLEAN
);

-- Create the episode_dates table
CREATE TABLE episodes (
    episode_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    date DATE,
    extra_info VARCHAR(255)
);

-- Create the subjects table
CREATE TABLE subjects (
    subject_id SERIAL PRIMARY KEY,
    episode VARCHAR(255),
    title VARCHAR(255),
    apple_frame BOOLEAN,
    aurora_borealis BOOLEAN,
    barn BOOLEAN,
    beach BOOLEAN,
    boat BOOLEAN,
    bridge BOOLEAN,
    building BOOLEAN,
    bushes BOOLEAN,
    cabin BOOLEAN,
    cactus BOOLEAN,
    circle_frame BOOLEAN,
    cirrus BOOLEAN,
    cliff BOOLEAN,
    clouds BOOLEAN,
    conifer BOOLEAN,
    cumulus BOOLEAN,
    deciduous BOOLEAN,
    diane_andre BOOLEAN,
    dock BOOLEAN,
    double_oval_frame BOOLEAN,
    farm BOOLEAN,
    fence BOOLEAN,
    fire BOOLEAN,
    florida_frame BOOLEAN,
    flowers BOOLEAN,
    fog BOOLEAN,
    framed BOOLEAN,
    grass BOOLEAN,
    guest BOOLEAN,
    half_circle_frame BOOLEAN,
    half_oval_frame BOOLEAN,
    hills BOOLEAN,
    lake BOOLEAN,
    lakes BOOLEAN,
    lighthouse BOOLEAN,
    mill BOOLEAN,
    moon BOOLEAN,
    mountain BOOLEAN,
    mountains BOOLEAN,
    night BOOLEAN,
    ocean BOOLEAN,
    oval_frame BOOLEAN,
    palm_trees BOOLEAN,
    path BOOLEAN,
    person BOOLEAN,
    portrait BOOLEAN,
    rectangle_3d_frame BOOLEAN,
    rectangular_frame BOOLEAN,
    river BOOLEAN,
    rocks BOOLEAN,
    seashell_frame BOOLEAN,
    snow BOOLEAN,
    snowy_mountain BOOLEAN,
    split_frame BOOLEAN,
    steve_ross BOOLEAN,
    structure BOOLEAN,
    sun BOOLEAN,
    tomb_frame BOOLEAN,
    tree BOOLEAN,
    trees BOOLEAN,
    triple_frame BOOLEAN,
    waterfall BOOLEAN,
    waves BOOLEAN,
    windmill BOOLEAN,
    window_frame BOOLEAN,
    winter BOOLEAN,
    wood_framed BOOLEAN
);

-- Create the episode_colors table
CREATE TABLE episode_colors (
    episode_id INT REFERENCES episodes(episode_id),
    color_id INT REFERENCES colors(color_id),
    PRIMARY KEY (episode_id, color_id)
);

-- Create the episode_subjects table
CREATE TABLE episode_subjects (
    episode_id INT REFERENCES episodes(episode_id),
    subject_id INT REFERENCES subjects(subject_id),
    PRIMARY KEY (episode_id, subject_id)
);
