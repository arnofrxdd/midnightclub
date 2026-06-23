export class HypeManager {
  constructor(game) {
    this.game = game;
    this.comboCount = 0;
    this.comboTimer = 0;
    this.maxComboTime = 3.0; // Seconds before combo resets
    this.currentStunts = new Set();
    
    // Stunt state trackers
    this.driftTime = 0;
    this.airTime = 0;
    this.draftTime = 0;
    
    // Cooldowns to prevent spamming
    this.nearMissCooldown = 0;
    this.smashCooldown = 0;
  }

  update(dt) {
    if (this.comboCount > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.resetCombo();
      }
    }

    if (this.nearMissCooldown > 0) this.nearMissCooldown -= dt;
    if (this.smashCooldown > 0) this.smashCooldown -= dt;
  }

  addStunt(type, value = 0) {
    let phrase = "";
    let color = "#ffffff";
    
    switch (type) {
      case 'drift':
        if (value > 3.0) phrase = "DRIFT KING!";
        else if (value > 1.5) phrase = "WICKED DRIFT";
        else phrase = "NICE SLIDE";
        color = "#00e5ff"; // Cyan
        break;
      case 'air':
        if (value > 2.0) phrase = "STRATOSPHERE!";
        else if (value > 1.0) phrase = "HANGTIME";
        else phrase = "NICE AIR";
        color = "#ff3b30"; // Red
        break;
      case 'nearmiss':
        if (this.nearMissCooldown > 0) return;
        phrase = "CLOSE CALL";
        color = "#ffc600"; // Yellow
        this.nearMissCooldown = 0.5;
        break;
      case 'draft':
        if (value > 2.0) phrase = "SLIPSTREAMING";
        else phrase = "DRAFTING";
        color = "#39ff14"; // Neon Green
        break;
      case 'smash':
        if (this.smashCooldown > 0) return;
        phrase = "WRECKING BALL";
        color = "#ff8800"; // Orange
        this.smashCooldown = 0.5;
        break;
      case 'cop':
        phrase = "COP TAKEDOWN!";
        color = "#0066ff"; // Blue
        break;
      case 'overtake':
        phrase = "OVERTAKE!";
        color = "#ff3b30"; // Red
        break;
    }

    if (!phrase) return;

    this.currentStunts.add(type);
    this.comboCount++;
    this.comboTimer = this.maxComboTime;

    // Combine phrases if combo > 1
    let finalPhrase = phrase;
    if (this.comboCount >= 3) {
      finalPhrase = "UNSTOPPABLE!";
      color = "#ff00ff"; // Magenta
    } else if (this.comboCount == 2) {
      finalPhrase = "SUPER COMBO!";
    }

    if (this.game.showHype) {
      this.game.showHype(finalPhrase, this.comboCount, color);
    }
  }

  triggerWipeout() {
    if (this.comboCount > 0) {
      if (this.game.showHype) {
        this.game.showHype("WIPEOUT!", 0, "#ff1e1e");
      }
    }
    this.resetCombo();
  }

  resetCombo() {
    this.comboCount = 0;
    this.comboTimer = 0;
    this.currentStunts.clear();
  }
}
