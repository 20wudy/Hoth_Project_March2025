"use client"

import { useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

export default function ProfileScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [locationServices, setLocationServices] = useState(true)

  // Mock user data
  const userData = {
    name: "John ACMHack",
    email: "hack@uclaacm.com",
    joinDate: "March 2025",
    stats: {
      totalScans: 24,
      correctSorts: 0,
      totalPoints: 280,
    },
    badges: [
      { id: "1", name: "5 XP: Trash Talker", icon: "ribbon-outline", unlocked: true },
      { id: "2", name: "25 XP: Bin There, Done That", icon: "leaf-outline", unlocked: true },
      { id: "3", name: "50 XP: Trash Panda", icon: "shield-outline", unlocked: false },
      { id: "4", name: "75 XP: Scrap Pro Quo", icon: "planet-outline", unlocked: false },
      { id: "5", name: "100 XP: Verified Binfluencer", icon: "planet-outline", unlocked: false },
      { id: "6", name: "150 XP: Junk Jedi", icon: "planet-outline", unlocked: false },
      { id: "7", name: "200 XP: Compost Commander", icon: "planet-outline", unlocked: false },
      { id: "8", name: "300 XP: Lord of the Bins", icon: "planet-outline", unlocked: false },
      { id: "9", name: "400 XP: LitterAlly Unstoppable", icon: "planet-outline", unlocked: false },
      { id: "10", name: "500 XP: You’re A True Litter Ally", icon: "planet-outline", unlocked: false }
    ],    
  }

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          // Navigate to the Loading screen and reset navigation stack
          navigation.reset({
            index: 0,
            routes: [{ name: "Loading" }],
          })
        },
      },
    ])
  }

  const renderBadge = (badge) => (
    <View key={badge.id} style={[styles.badgeCard, !badge.unlocked && styles.lockedBadge]}>
      <View style={styles.badgeIconContainer}>
        <Ionicons name={badge.icon} size={28} color={badge.unlocked ? "#22c55e" : "#94a3b8"} />
        {!badge.unlocked && (
          <View style={styles.lockOverlay}>
            <Ionicons name="lock-closed" size={16} color="white" />
          </View>
        )}
      </View>
      <Text style={[styles.badgeName, !badge.unlocked && styles.lockedText]}>{badge.name}</Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitials}>
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
          </View>

          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <Text style={styles.joinDate}>Member since {userData.joinDate}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userData.stats.totalScans}</Text>
              <Text style={styles.statLabel}>Total Scans</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userData.stats.correctSorts}</Text>
              <Text style={styles.statLabel}>Correct Sorts</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userData.stats.totalPoints}</Text>
              <Text style={styles.statLabel}>Total Points</Text>
            </View>
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.badgesSection}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgesGrid}>{userData.badges.map(renderBadge)}</View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications-outline" size={22} color="#64748b" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#d1d5db", true: "#22c55e" }}
              thumbColor="white"
            />
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon-outline" size={22} color="#64748b" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#d1d5db", true: "#22c55e" }}
              thumbColor="white"
            />
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingInfo}>
              <Ionicons name="location-outline" size={22} color="#64748b" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Location Services</Text>
            </View>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: "#d1d5db", true: "#22c55e" }}
              thumbColor="white"
            />
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.accountActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={20} color="#64748b" style={styles.actionIcon} />
            <Text style={styles.actionText}>Help Center</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={20} color="#64748b" style={styles.actionIcon} />
            <Text style={styles.actionText}>Account Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#ef4444" style={styles.actionIcon} />
            <Text style={[styles.actionText, styles.logoutText]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#f0fdf4",
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#22c55e",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: "#94a3b8",
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#22c55e",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#64748b",
  },
  badgesSection: {
    padding: 20,
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeCard: {
    width: "48%",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  lockedBadge: {
    opacity: 0.7,
  },
  badgeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },
  lockOverlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#94a3b8",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  lockedText: {
    color: "#94a3b8",
  },
  settingsSection: {
    padding: 20,
  },
  settingCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  accountActions: {
    padding: 20,
    paddingTop: 0,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginBottom: 10,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#fef2f2",
  },
  logoutText: {
    color: "#ef4444",
  },
})

