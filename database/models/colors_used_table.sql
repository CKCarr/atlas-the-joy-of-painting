INSERT INTO colors_used (
    episode_index, painting_index, img_src, painting_title, season, episode,
    num_colors, youtube_src, colors, color_hex, black_gesso, bright_red,
    burnt_umber, cadmium_yellow, dark_sienna, indian_red, indian_yellow,
    liquid_black, liquid_clear, midnight_black, phthalo_blue, phthalo_green,
    prussian_blue, sap_green, titanium_white, van_dyke_brown, yellow_ochre,
    alizarin_crimson
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
    $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)
